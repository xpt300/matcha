const connexion = require('../database/database');
var bcrypt = require('bcrypt');
let express = require('express');
let router = express.Router();
const config = require('../config');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const cryptoRandomString = require('crypto-random-string');
var xss = require("xss");
const publicIp = require('public-ip');
const axios = require('axios');
const Local = require('../../../../env');

router.get('/mail', (req, res) => {
    let data = {};
    for(var key in req.query) {
        data[key] = xss(req.query[key])
    }
    connexion.query("SELECT id FROM matcha.user WHERE mail = ?", 
        [data.mail], function(err, resultat) {
        if (err) throw err;
        res.send(resultat);
    });
});

router.get('/account', (req, res) => {
    let data = {};
    for(var key in req.query) {
        data[key] = xss(req.query[key])
    }
    connexion.query("SELECT id, mot_de_passe, prenom, nom, compte_valide, notification, anniversaire, address, ville, pays, mail FROM matcha.user WHERE mail = ?", 
    [data.mail], function(err, resultat) {
        if (err) {
            console.log(err);
            res.send(err);
        };
        if (resultat[0] && resultat[0].compte_valide == 'Y') {
            bcrypt.compare(data.key, resultat[0].mot_de_passe, function(err, resu) {
                if (err) {
                    console.log(err);
                    res.status(500).send()
                }
                if (resu){
                    const token = jwt.sign({id: resultat[0].id}, config.secret, {
                        expiresIn: config.tokenLife
                    });
                    res.status(200).send({res: resultat[0], token: token});
                } else {
                    res.send()
                }
            });
        } else {
            res.send();
        }
    });
});

router.post('/inscription/new', (req, res) => {
    let data = {};
    let query = {}
    for(var key in req.body) {
        data[key] = xss(req.body[key])
    }
    query.target = data.target;
    query.genre = data.genre;
    query.longitude = data.longitude;
    query.latitude = data.latitude;
    query.max_age = 35;
    query.min_age = 25;
    query.distance = 50;
    delete data.latitude;
    delete data.longitude;
    delete data.target;
    delete data.genre;
    data.cle = bcrypt.hashSync(cryptoRandomString(10), 10);
    data.mot_de_passe = bcrypt.hashSync(data.mot_de_passe, 10);
    connexion.query("INSERT INTO matcha.user SET ?", [data], function(err, resultat) {
        if (err) {
            console.log(err);
            res.status(500).send("ERROR query")
        }
        query.id_user = resultat.insertId;
        connexion.query("INSERT INTO matcha.reglage SET ?", [query], function(err, resultat) {
            if (err) {
                console.log(err);
                res.status(500).send("ERROR query")
            }
            const token = jwt.sign({id: query.id_user}, config.secret, {
                expiresIn: config.tokenLife
            });
            nodemailer.createTestAccount((err, account) => {
                if (err) {
                    console.log(err);
                    res.status(500).send("ERROR nodemailer")
                }
                let transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true, 
                    auth: {
                        user: Local.MAIL, // generated ethereal user
                        pass: Local.PASSWD // generated ethereal password
                    }
                });
                let lien = 'https://localhost:3000/confirmation/' + data.cle;
                let mailOptions = {
                    from: '"Camagru 😀" <camagru@example.com>', // sender address
                    to: data.mail, // list of receivers
                    subject: 'Confirmer votre adresse mail ✍️', // Subject line
                    generateTextFromHTML:  true,
                    html: '<center><b>Bonjour, veuillez valider votre adresse mail 😇<br><br>Il suffit de suivre ce lien: <a href="' + lien.toString() + '">VALIDATION</a></center>' // html body
                };
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        res.status(500).send({message: "error envoye mail"});
                        return console.log(error);
                    }
                    console.log('Message sent: %s', info.messageId);
                });
                res.status(200).send({res: resultat, token: token});
            });
        });
        
    });
});

router.post('/inscription/new/facebook', (req, res) => {
    const key = bcrypt.hashSync(cryptoRandomString(10), 10);
    let data = [
        [key,
        req.body.first_name,
        req.body.last_name,
        req.body.email,
        'Y',
        'Y'
        ]
    ];
    (async () => {
        return(await publicIp.v4());
    })().then(response => {
        axios.get('http://ip-api.com/json/' + response)
        .then(response => {
            console.log(response.data);
            connexion.query("INSERT INTO matcha.user (`cle`, `prenom`, `nom`, `mail`, `compte_valide`, `notification`) VALUES ?", [data], function(err, resultat) {
                if (err) {
                    console.log(err);
                    return;
                }
                let data = [
                    [resultat.insertId,
                    req.body.picture.data.url
                    ]
                ];
                connexion.query("INSERT INTO matcha.img (`id_user`, `path_img`) VALUES ?", [data], function(err, res) {
                    if (err) {
                        console.log(err);
                        res.send(err)
                        return;
                    }
                });
                let query = {
                    id_user: data[0][0],
                    genre: "autre",
                    target: "autre",
                    latitude: response.data.lat,
                    longitude: response.data.lon,
                    max_age: 35,
                    min_age: 25,
                    distance: 50
                }
                console.log(query)
                connexion.query("INSERT INTO matcha.reglage SET ?", [query], function(err, resu) {
                    if(err) {
                        console.log(err);
                        res.status(500).send("Error query");
                    }
                    const token = jwt.sign({id: query.id_user}, config.secret, {
                        expiresIn: config.tokenLife
                    });
                    res.status(200).send({token: token});
                });
            });
        });
    });
});

router.post('/reinit/check', (req, res) => {
    connexion.query("SELECT `id` from matcha.user where cle = ?", req.body.key, function(err, resultats) {
        if (err) {
            res.status(401).send('Error')
            return;
        }
        if (typeof resultats[0] !== 'undefined') {
            res.status(200).send({id : resultats[0].id});
        } else {
            res.send({search: 0});
        }
    });
})

router.post('/reinit', (req,res) => {
    let data = {
        password: xss(req.body.passwd)
    };
    const newKey =  bcrypt.hashSync(cryptoRandomString(10), 10);
    const pass = bcrypt.hashSync(data.password, 10);
    connexion.query('UPDATE matcha.user SET ? WHERE ? ',
        [{cle: newKey, mot_de_passe: pass}, {id: req.body.id}], function(err, resultat){
            if (err) {
                console.log(err)
                res.status(500).send("Error query")
            }
            connexion.query("SELECT id, mail, prenom, nom, compte_valide, notification, anniversaire, address, ville, pays FROM matcha.user WHERE cle = ?",
            [newKey], function(err, resu){
                if (err) {
                    console.log(err);
                    res.status(500).send("Error query")
                }
                const token = jwt.sign({id: resu[0].id}, config.secret, {
                    expiresIn: config.tokenLife
                });
                res.status(200).send({res: resu, token: token});
            });
        })
})

router.post('/mailsend', (req, res) => {
    let data = {
        mail: xss(req.body.mail),
        id: xss(req.body.id.id)
    };
    connexion.query("SELECT `cle` from matcha.user where id = ?", data.id, function(err, resultats){
        if (err){
            res.status(600).send("Error query");
            return console.log(err);
        }
        const key = resultats[0].cle;
        nodemailer.createTestAccount((err, account) => {
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true, 
                auth: {
                    user: "test.root.mjoubert@gmail.com", // generated ethereal user
                    pass: "Aymeric@69" // generated ethereal password
                }
            });
            let lien = 'https://localhost:3000/reinitialisation/' + key;
            let mailOptions = {
                from: '"Camagru 😀" <camagru@example.com>', // sender address
                to: data.mail, // list of receivers
                subject: 'Reinitialisation mot de passe 🔐', // Subject line
                generateTextFromHTML:  true,
                html: '<center><b>Bonjour, il me semble que vous avez oublié votre mot de passe?<br><br>Pour réinitialiser votre mot de passe suivez ce lien: <a href="' + lien.toString() + '">REINITIALISATION</a></center>' // html body
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    res.status(500).send({message: "error envoye mail"});
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
            });
        });
        res.status(200).send({message: "mail envoye"});
    });
});

router.post('/confirmation', (req, res) => {
    const newKey = bcrypt.hashSync(cryptoRandomString(10), 10);
    connexion.query('UPDATE matcha.user SET ? WHERE ?', 
                    [{compte_valide: 'Y', cle: newKey}, {cle: req.body.key}], function(err, resultat){
        if (err) {
            console.log(err)
            res.status(500).send('ERROR query')
        }
        if (resultat.changedRows !== 0) {
            connexion.query("SELECT id, mail, prenom, nom, compte_valide, notification, anniversaire, address, ville, pays FROM matcha.user WHERE cle = ?",
            [newKey], function(err, resultat){
                if (err){
                    console.log(err)
                    res.status(500).send({search: 0})
                }
                const token = jwt.sign({id: resultat[0].id}, config.secret, {
                    expiresIn: config.tokenLife
                });
                res.status(200).send({search: 1, resultat, token: token});
            });
        } else {
            res.send({search: 0});
        }
    })
})

module.exports = router;


