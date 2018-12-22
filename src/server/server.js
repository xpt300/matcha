const express = require('express');
const app = express();
const port = 8000;
const bodyParser = require('body-parser');
const account =  require('./models/user/account');
const session =  require('./models/session/session');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const recherche = require('./models/recherche/recherche')


app.use(
    bodyParser.urlencoded({
      extended: true
    }),
    function (req, res, next) {
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    }
);

app.use(cookieParser());
app.disable('x-powered-by');
app.use(helmet());
app.use(bodyParser.json());

app.use('/user', account);
app.use('/session', session);
app.use('/recherche', recherche);
  
app.listen(port, () => console.log('App listening on port ' + port));