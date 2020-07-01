const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes/router');
const session = require('express-session');
const mysql = require('mysql');
const app = express();

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true

}));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/pages', routes);


app.get('/',(req, res)=>{
   res.render('home');
});



app.listen(3000, console.log('server is running'));
