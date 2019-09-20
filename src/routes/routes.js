const express = require('express');
const path = require('path');
const router = express.Router();
const productSchema = require('../model/producto');
const clientes = require("../model/cliente");
const User = require("../model/user");
const bcryst = require('bcryptjs');

const passport = require('passport');
/*
 se ejecuta cuando se entra a la ruta por
 defecto del servidor 3000
*/
//redirige por defecto al localhost:3000/


router.route('/')
  .all((req,res,next)=>{
    res.redirect('/login');
})


router.route('/index')
        .get((req,res)=> res.render('/index'))

const consultarProductos = async (req, res, next) => {
    try {
        res.json({"message":"welcome to hell"});
        /*
        const p = await productSchema.find().sor("-_id");
        res.json(p);
        */

    } catch (error) {

       await res.json({ "mensaje": "no se logro ejecutar la peticion" + error });

    }
}



const crearProductos =  async (req, res, next ) => {
    try {
        const { codigo, nombre, stock, precio, iva } = req.params;
        if (!codigo && !nombre && (!descripcion) && (!precio) && (!stock) && (!iva)) {
            res.send(`debe ingresar los parametros debidos para crear un producto`);
        } else {
            var p = new productSchema(
                nombre,
                descripcion,
                cantidad,
                precio,
                precio * 0.19
            )
            p.save()
                .then(() => res.json({ "message": "producto registrado exitosamente" })
                .cath((err) => res.json({ "Error": "no se logro registrar el producto intente nuevaente" })));
        }
    } catch (error) {
        res.send("error no se procesaron datos" + error);
    }

}

const actualizarProductos = async (req, res,  next)  => {
    try {
        const { codigo, nombre, cantidad, descripcion, precio, iva } = req.body;
        if (!codigo && !nombre && !cantidad && !descripcion && !precio && !iva) {
            res.json({ "error": "debe ingresar todos los datos para actualizalos" })
        }

        else {
            const respuesta = await productSchema.updateOne({ codigo: req.body.codigo },
                {
                    $set: {
                        nombre: req.body.nombre,
                        cantidad: req.body.cantidad,
                        descripcion: req.body.descripcion,
                        precio: req.body.precio,


                    }
                }, (err) => err ? res.send(err) : res.send("updated successfully"))

        }
    } catch (error) {
        res.send("error no se procesaron datos" + error);
    }

}

const destroyProductos = async (req, res,next) => {
    try {
        const { codigo } = req.body;
        const p = await productSchema.deleteOne({ codigo: req.body.codigo },
            (err) => err ? res.send(err) : res.send("deleted successfully")
        );
    } catch (error) {
        res.send("error no se procesaron datos" + error);
    }

}

router.route('/producto')
      .get(consultarProductos)
      .post(crearProductos)
      .put(actualizarProductos)
      .delete(destroyProductos)


router.route('/register')
      .get((req, res, next) => {
          res.render('register');
          
        })
      .post( (req, res, next) => {
            const {email , password, password2, roll} = req.body

            if(!email){
                res.send("debe ingresar su corrreo electronico")
            }
            else if(!password){
                res.send("debe ingresar una contraseña valida")
            }
            else if(password != password2){
                res.send("las contraseñas deben coincidir")
            }
            else if(password.length<6){
                res.send("la contraseña debe de tener almenos 6 caracteres")
            }
            else{
               User.findOne({email : email})
               .then((users)=>{
                if(users) {
                   res.send("el usuario ya esta registrado en la base de datos")
                }
                else{
                
                
                        const userss = new User(
                            {
                                email,
                                password,
                                roll,
                                estado:"sin verificar"

                                
                                
                            }

                        );

                        console.log(users);

                        bcryst.genSalt(10, (err, salt) =>
                            bcryst.hash(userss.password , salt ,(err,hash) => {
                                if(err) throw err;
                                userss.password = hash;
                                userss.save()
                                .then(users =>{
                                    console.log('saved');
                                    res.redirect('/dashboard',{
                                        name: req.body.email
                                    })
                                })
                                .catch(err => console.log(err))
                            })
                        )
                       
                    
                    }
                
            })

            }
        
     
        
        
      
        });
          
      /*
      .post(    passport.authenticate('local-signup',{
              successRedirect : '/login',
              failureRedirect : '/index',
              passReqToCallback : true
          })
      .post(*/
          
        /*
        
        
       
        */
   

      
      router.route('/login')
      .get((req, res, next) => {
          res.render('login');
        })
      .post((req,res,next)=>{})  
     




      router.route('/dashboard')
      .get((req, res, next) => {
          res.render('dashboard');
        })
      .post((req,res,next)=>{

      })  

     



module.exports = router;