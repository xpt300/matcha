const fs = require('fs');
const path = require('path');
const faker = require('faker');
const bcrypt = require('bcrypt');
const connexion = require('../models/database/database');
const cryptoRandomString = require('crypto-random-string');
const list_hobbies = require('./list_hobbies');

const pathSql = path.join(__dirname, './matcha.sql');

const matchaSQL = fs.readFileSync(pathSql, 'utf8');

connexion.query("SHOW DATABASES", function(err, results, fields){
  if (err) {
    console.log("Probleme SHOW DATABASES " + err);
    return;
  }
  const array = results.map(x => x.Database);
  for (var i = 0; array[i]; i++){
    if (array[i] === 'matcha'){
      console.log('DATABASE DEJA CREEE');
      return;
    }
  }
  connexion.query(matchaSQL, function(err, results, fields) {
    if (err) {
      console.log(err.message);
      return;
    }
    console.log('CREATE ALL DATABASE [OK]');
    connexion.query("USE MATCHA", function(err, results, fields) {
      if (err) {
        console.log(err.message);
        return;
      }
      console.log('USE MATCHA [OK]');
      faker.locale = "fr";
      var sql = "INSERT INTO `user`(`cle`,`prenom`, `nom`, `mail`, `mot_de_passe`, `compte_valide`, `notification`, `address`, `ville`, `pays`, `codePostal`, `biographie`, `connect`, `dernier_co`, `anniversaire`, `popularite`) VALUES ?";
      var array = [];
      for (var i = 0; i < 500; i++){
        const date = new Date();
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync("root42", salt);
        const key = bcrypt.hashSync(cryptoRandomString(10), 10);
        let dob = faker.date.past(50, new Date("Sat Sep 20 1992 21:35:02 GMT+0200 (CEST)"));
        dob = dob.getFullYear() + "-" + (dob.getMonth()+1) + "-" + dob.getDate();
        var arrayFaker = [[key, faker.name.firstName(), faker.name.lastName(), 
          faker.internet.email(), hash, 'N', 'Y', 
          faker.address.streetAddress(), faker.address.city(), faker.address.state(), faker.address.zipCode(), 
          faker.lorem.sentences(), 'N', date, dob, Math.floor((Math.random() * (10 - 1 + 1)) + 1)]];
          array = array.concat(arrayFaker);
      }
      connexion.query(sql, [array], function(err, results, fields) {
        if (err) {
          console.log(err.message);
          return;
        }
        console.log('USER [OK]');
        var sql = "INSERT INTO `img` (`id_user`, `path_img`) VALUES ?";
        var array = [];
        for (var i = 1; i < 501; i++) {
          var arrayImg = [[i, faker.image.avatar()]]
          array = array.concat(arrayImg);
        }
        connexion.query(sql, [array], function(err, results, fields) {
          if (err) {
            console.log(err.message);
            return;
          }
          console.log('IMG [OK] -> DONE');
          var sql = "INSERT INTO `reglage` (`id_user`, `latitude`, `longitude`, `distance`, `max_age`, `min_age`, `genre`, `target`) VALUES ?";
          var array = [];
          for (var i = 1; i < 501; i++) {
            let gender = [ 'female' , 'male' ];
            let gender1 = gender[Math.floor(Math.random()*2)];
            let gender2 = gender[Math.floor(Math.random()*2)];
            let age = Math.floor((Math.random() * (40 - 10 + 1)) + 1);
            var arrayFaker = [[i,  faker.address.latitude(), faker.address.longitude(), 
              Math.floor((Math.random() * (600 - 1 + 1)) + 1), age + 10, age, 
              gender1, gender2]];
              array = array.concat(arrayFaker);
          }
          connexion.query(sql, [array], function(err, results, fields) {
            if (err) {
              console.log(err.message);
              return;
            }
            console.log('REGLAGE OK');
            var sql = "INSERT INTO `tag` (`tag`) VALUES ?";
            connexion.query(sql, [list_hobbies], function(err, results, fields) {
              if (err) {
                console.log(err.message);
                return;
              }
              console.log('TAG OK');
              var sql = "INSERT INTO `tag_id` (`id_user`, `id_tag`) VALUES ?";
              var array = [];
              for (var i = 1; i < 501; i++) {
                for (var a = 0; a < Math.floor((Math.random() * (10 - 1)) + 1); a++) {
                  var tmp = [i, Math.floor((Math.random() * (306 - 1)) + 1)];
                  array.push(tmp);
                }
              }
              connexion.query(sql, [array], function(err, results, fields) {
                if (err) {
                  console.log(err.message);
                  return;
                }
                console.log('REGLAGE OK');
              });
            });
          });
        });
      });
    });
  });
});