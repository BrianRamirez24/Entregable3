const express = require('express');
const bcryst = require('bcryptjs');
const path = require('path');
const router = express.Router();
const Users = require('../model/user');
const { registrarUsuario } = require('../controller/userscontroller')
const passport = require('passport');

/*
 se ejecuta cuando se entra a la ruta por
 defecto del servidor 3000
*/
//redirige por defecto al localhost:3000/


router.route('/')
  .all((req,res,next)=>{
    res.redirect('/user/login');
})



router.route('/user/register')
      .get((req, res) => {
          res.render('user/register');
       })
  
     .post(registrarUsuario);
  
     


    






      /*
      .post(    passport.authenticate('local-signup',{
              successRedirect : '/login',
              failureRedirect : '/index',
              passReqToCallback : true
          })
      .post(*/
          
        /*
        
        
       
        */
   

      
      router.route('/user/login')
      .get((req, res, next) => {
          res.render('user/login');
        })
      .post((req,res,next)=>{})  
     




      router.route('/dashboard')
      .get((req, res, next) => {
          res.render('user/dashboard');
        })
      .post((req,res,next)=>{

      })  






module.exports = router;