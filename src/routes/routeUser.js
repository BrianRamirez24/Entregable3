const express = require('express');
const bcryst = require('bcryptjs');
const path = require('path');
const router = express.Router();
const Users = require('../model/user');
//const { registrarUsuario } = require('../controller/userscontroller')
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


const registrarUsuario = async function(req, res){
  try {

 const {nombre,
        email, 
        password, 
        password2, 
        roll
        } = req.body
      
     var errors = [];

  if(nombre.length<=0){
      errors.push({ message :'debe ingresar un nombre valido'});   
  }

  if(email.length<8 ){
    errors.push({ message :'debe ingresar un email valido'});
  }

  if(password.length<6){
     errors.push({ message :'La contraseña debe de tener al menos 6 caracteres'});
  }
  
  if (password != password2){
   errors.push({ message :'las contraseñas deben coincidir'});
  }

     const resultado = await Users.findOne({email : email});
     
     if(resultado){
      console.log(`resultado 
                  ${resultado}`);
      req.flash('errormsg', 'el usuario ya está registrado');
    
           }
      
      
      /*
      const userss = new Users(
        {
            email,
            password,
            roll,
            estado:"sin verificar"                     
        }
        );

         bcryst.genSalt(10, (err, salt) =>
         bcryst.hash(userss.password , salt ,(err,hash) => {
              if(err){ 
               throw err;
              }
             else{
             userss.password = hash;
             console.log(userss);
          
            
             /*
             await userss.save( err =>{
               err?
               console.log('no se inserto usuario intente nuevamente'):
               req.flash('exitomsg','usuario registrado');
             }); 
             */

           /*  }
            })
            
            ); */
        
         
        
           /*  await userss.save(
              (err) =>{
                (err)?
                res.flash('error','no se logro registrar el usuario intente nuevamente'):
                res.flash('success_msg','usuario registrado')
              }
            ); */
   
     
    
             
            
         
         

        } catch(err){
          console.error(err);
           req.flash('error', JSON.stringify(err));
           res.send(req.flash('error'));
         }
            
 }
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