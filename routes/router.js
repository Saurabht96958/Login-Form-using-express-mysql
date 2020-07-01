const express = require('express');
const router = express.Router();
const mysql = require('mysql');
//const session = require('express-session');



var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "test"
});


router.get('/register',(req, res)=>{
  res.render('register',{data : ''});
});
/*
con.query("select * from login where email ='abc@gmail.com'", (err, result)=>{
  if(err) throw err;
  console.log(result[0].name)
});
*/

router.post('/register', (req, res)=>{
  let name = req.body.name;
  let email = req.body.email;
  let password1 = req.body.password1;
  let password2 = req.body.password2;

  if(!name || !email || !password1 || !password2)
  {
     res.render('register',{data : 'fill all fields carefully!'});
  }
  else
  {
    if(password1 === password2 && password1.length >= 6)
    {
      let q = "select email from login where email = '"+email+"'";
      con.query(q, (err, result)=>{
         if(err) throw err;
         if(result.length == 0)
         {
           con.query("insert into login(name , email, password) values('"+name+"','"+email+"','"+password1+"')",(err, result)=>{
             if(err) throw err;
             res.render('register',{data : 'successfully registered!'});
           });
         }

         else
         {
            res.render('register',{data : 'email already exists!'});
         }
      });

   }
   else
   {
     res.render('register',{data : 'password length should be at least 6 digits/number'})
   }
  }
});
router.get('/login',(req, res)=>{
  res.render('login',{data : ''});
});

router.post('/login',(req,res)=>{
  let email = req.body.email;
  let password = req.body.password;
  if(!email || !password)
  {
    res.render('login',{data : '  enter a valid email or password!'});
  }
  else{
    con.query("select * from login where email = '"+email+"' and password = '"+password+"'",(err, result)=>{

      if(result.length > 0){
         req.session.loggedIn = true;
         req.session.name = result[0].name;
         //console.log(req.session.loggedIn);
         //console.log(result.name);
         res.redirect('/pages/dashboard');
      }else{
        res.render('login',{data : '     invalid email or password!'});
      }
    })
  }

});
router.get('/dashboard',(req, res)=>{
  if(req.session.loggedIn){
    res.render('dashboard',{data : req.session.name});
  }else{
    res.render('dashboard',{data : 'please login!'});
  }

});

router.get('/logout', (req, res)=>{
  req.session.loggedIn = false;
  res.redirect('/pages/login');
});


module.exports = router;
