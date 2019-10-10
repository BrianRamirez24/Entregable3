const ClientSchema = require('../model/cliente');





module.exports = {

    createProduct: async function(req,res){
        const {tipod, 
               doc,
               nombre, 
               apellidos,
               genero, 
               direccion, 
               telefono, 
               celular } = req.body;
    try{
        if(!doc || doc.length<5) {
            res.status(500).send('por favor ingrese su numero de documento')
        }
        if(!nombre || nombre.length <=0){
            res.status(500).send('por favor ingrese un nombre valido');

        }
        if(!apellidos || apellidos.length<=0){
            res.status(500).send('no se reconoce apellido por favor intente nuevamente');
        
        }
        if(!direccion || direccion.length<5){
            res.status(500).send('no se reconoce direccion por favor digite nuevamente');
        
        }
        if(!telefono){
            res.status(500).send('no se reconce telefono por favor ingrese nuevamente');
        
        }
        
        if(!celular){
            res.status(500).send('no se reconoce numero de celular por favor ingrese nuevamente');
        
        }
        
        else{
           await ClientSchema.findOne({doc: doc})
                             .then((cliente)=>{
              if(cliente){

                res.status(500).send('el cliente ya esta registado');

              }
              else{

                  const products = new ProductSchema({
                        tipod,
                        doc,
                        nombre, 
                        apellidos,
                        genero,
                        direccion,
                        telefono, 
                        celular
                  });

                  console.log(products);

                   await products.save(err =>{

                        err ?
                        res.status(500).send('no se almacenaron datos intente nuevamente') : 
                        res.status(200).send('producto registrado exitosamente');
                       
                })
             
          }
         
        
        })



        .catch(err =>console.log( err ));
    }
} catch(error){
        console.log('error: ', error);
    }

    },

    listProducts: async function(req, res) {
        const clientList = await ClientSchema.find().sort({name: 'asc'});
        res.render('/dashboard',{ productList });
    },

    updateProduct: async function(req, res){

        const { codigo, nombre, descripcion,stock, precio } = req.body;

        const objProduct = {
                codigo:"",
                nombre:"",
                descripcion:"",
                stock:"",
                precio:""
        };

        try{


         if(codigo){ objProduct.codigo = codigo;}
         if(nombre){ objProduct.nombre = nombre; }
         if(descripcion){ objProduct.descripcion = descripcion; }
         if(stock){ objProduct.stock = stock; }
         if(precio) { objProduct.precio = precio; }
         var id = req.params.id;
         if(id){
             await ProductSchema.findOneAndUpdate({ codigo: codigo } , {$set : objProduct}, 
                err=> err  ?  res.status(500).flash('no se pudo actualizar el producto'): 
                              res.status(200).flash('success_msg','producto actualziado exitosmante'))
         }

    }catch(error){
        res.status(500).flash(error)
    }


    },
    
    destroyProduct:async function (req, res){
        try{
            const id= req.params.id;
                await ProductSchema.deleteOne({ id }, err =>{ 
                                                      err ? res.status(500).send( 'no se elimino el producto') : 
                                                      res.status(200).flash('success_msg','producto eliminado exitosamente')})
        }
        catch(error){

        }
    },

    fiterProduct: async function(req, res) {
        const productList = await ProductSchema.findOne({codigo:codigo},(err,products)=>{
            err?  res.status(500).send( 'registro no encontrado') : 
            res.redirect('/products/');
        });
        res.render('/products/productFilter',{ productList });
    },



}