const mysql = require('mysql');

const connexion = mysql.createConnection({
    host: "localhost",
    user: "root42",
    password: "aymeric69",
    multipleStatements: true
});
connexion.connect();

module.exports = connexion;