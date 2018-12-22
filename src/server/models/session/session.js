let express = require('express');
let router = express.Router();
const config = require('../config');
const jwt = require('jsonwebtoken');


router.post('/check', (req, res) => {
    jwt.verify(req.body.token, config.secret, function(err, decoded) {
        if (err) {
            console.log(err);
            res.status(500).send("Erreur token")
        }
        res.status(200).send(decoded);
    });
});

module.exports = router;


