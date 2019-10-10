const ClientSchema = require('../model/cliente');

module.exports = {

    createProduct: async function(req,res){
        const { tipod, 
                doc,
                nombre, 
                apellidos,
                genero, 
                direccion, 
                telefono, 
                celular } = req.body;
    try{
        if(!doc) {
            res.send('codigo de producto requerido')
        }
        else if(!nombre){
            res.send('debe ingresar el nombre del producto');

        }else if(!apellidos){
            res.send('debe de ingresar una descripcion valida al producto');
        
        }else if(!direccion){
            res.send('por favor ingrese un stock al producto');
        
        }
        else if(!telefono){
            res.send('debe darle un precio');
        
        }
        
        else if(!celular){
            res.send('debe darle un precio');
        
        }
        
        else{
           await ClientSchema.findOne({doc: doc})
                             .then((cliente)=>{
              if(cliente){

                res.send('el cliente ya esta registado');

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
                        res.send('erorr','no se almacenaron datos intente nuevamente') : 
                        req.send('success_msg', 'producto registrado exitosamente');
                        res.redirect('/dashboard');
                })
             
          }
         
        
        })



        .catch(err =>console.log( err ));
    }
} catch(error){
        console.log('error: ', error);
        res.send(JSON.stringify(error));
    }

    },

    listProducts: async function(req, res) {
        const productList = await ProductSchema.find().sort({name: 'asc'});
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
                err=> err  ?  res.send('no se pudo actualizar el producto'): 
                              req.send('success_msg','producto actualziado exitosmante'))
         }

        }catch(error){
            res.send(error)
        }


    },
    
    destroyProduct:async function (req, res){
        try{
            const id = req.params.id;
                await ProductSchema.deleteOne({ id }, err =>{ 
                                                      err ? 
                                                      res.send('no se elimino el producto') : 
                                                      res.send('producto eliminado exitosamente')})
        }
        catch(error){

        }
    },

    listProduct:async function(req,res){
        const productList = await ProductSchema.find((err, products)=>{
            err?  res.send( 'no se encuentran productos registrados') : 
            res.status(200).send(productList)
        });
        res.render('/products/productFilter',{ productList });
    },
    fiterProduct: async function(req, res) {
        const productList = await ProductSchema.findOne({codigo:codigo},(err,products)=>{
            err?  res.send( 'registro no encontrado') : 
            res.redirect('/products/');
        });
        res.render('/products/productFilter',{ productList });
    }



}