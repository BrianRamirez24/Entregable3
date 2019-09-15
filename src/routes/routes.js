const express = require('express');
const path = require('path');
const router = express.Router();
const productSchema = require('../model/producto');
const clientes = require("../model/cliente");
/*
 se ejecuta cuando se entra a la ruta por
 defecto del servidor 3000
*/
//redirige por defecto al localhost:3000/


router.route('/').all((req,res,next)=>{
    res.redirect('/signup');
})

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


      router.route('/signup')
      .get((req, res, next) => {
          res.render('signup');
        })
      .post((req,res,next)=>{
          console.log(req.body);
      })
      
      router.route('/login')
      .get((req, res, next) => {
          res.render('index');
        })
      .post((req,res,next)=>{})  
     

module.exports = router;