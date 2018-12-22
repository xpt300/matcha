const connexion = require('../database/database');
let express = require('express');
let router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config');
const publicIp = require('public-ip');
const axios = require('axios')
var xss = require("xss");

router.post('/geolocalisation', (req,res) => {
    jwt.verify(req.body.token, config.secret, function(err, decoded) {
        if (err) {
            console.log(err);
            res.status(500).send("Erreur token")
        }
        console.log('TOKEN ok', decoded);
        res.send();
        // (async () => {
        //     return(await publicIp.v4());
        // })().then(response => {
        //     axios.get('http://ip-api.com/json/' + response)
        //     .then(response => {
        //         console.log(response.data);
        //         res.send();
        //     });
        // });
    });
});

router.post('/coordonnees', (req,res) => {
    console.log(req.body)
    let data = {};
    for(var key in req.body) {
        data[key] = xss(req.body[key])
    }
    data.distance = 50;
    data.min_age = 25;
    data.max_age = 35;
    console.log(data)
    // connexion.query("INSERT INTO matcha.user (`latitude`, `longitude`, `distance`, `max_age`, `min_age`) VALUES ?", [data], )
});

router.post('/recherche', (req,res) => {
    console.log(req.body, "models")
    let data = {};
    for(var key in req.body) {
        data[key] = xss(req.body[key])
    }
    console.log(data, "models test")
    connexion.query("INSERT INTO matcha.user (`latitude`, `longitude`, `distance`, `max_age`, `min_age`) VALUES ?", [data], )
});

module.exports = router;