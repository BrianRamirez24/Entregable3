const ProductSchema = require('../model/producto');


module.exports = {

    createProduct: async function(req,res){
        const { codigo, 
                nombre, 
                descripcion,
                stock, 
                precio 
            } = req.body;

        var errors = []; 
        
    try{
        if(!codigo) {
            res.status(401).send('por favor ingrese un codigo valido para el producto');
        }
        else if(!nombre){
            res.status(401).send('por favor ingrese un nombre valido al producto');
        }
        else if(!descripcion){
            res.status(401).send('por favor ingrese una descripcion valida');
        }
        else if(!stock){
            res.status(401).send('por favor ingrese un stock valido');
        }
        else if(!precio){
            res.status(401).send('por favor ingrese un precio valido ');
        
        }
        else{
           ProductSchema.findOne({codigo: codigo})
                             .then((product)=>{
              if(product){
                res.status(401).send('el producto ya esta registrado');
              }
              else{

                  const products = new ProductSchema({
                      
                      codigo,
                      nombre, 
                      descripcion,
                      stock, 
                      precio
                  });

                  console.log(products);

                   await products.save(err =>{
                        err ?
                        res.status(401).send('no se registraron datos por favor registre nuevamente'): 
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
        const productList = await Promise.resolve(ProductSchema.find().sort({name: 'asc'}));
        res.status(200).send({ productList });
    },

    updateProduct: async function(req, res){

        const { codigo, 
                nombre, 
                descripcion,
                stock, 
                precio } = req.body;

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
      
             await ProductSchema.findOneAndUpdate({ codigo: codigo } , {$set : objProduct}, 
                err => err  ?  req.flash('no se pudo actualizar el producto'): 
                               res.status(200)('success_msg','producto actualziado exitosmante'))
       

    }catch(error){
        req.flash(error)
    }


    },
    
    destroyProduct:async function (req, res){
        try{
            const id= req.params.id;
                await ProductSchema.deleteOne({ id }, err =>{ 
                                                      err ? req.flash('error', 'no se elimino el producto') : 
                                                      res.status(200).flash('success_msg','producto eliminado exitosamente')})
        }
        catch(error){

        }
    },

    fiterProduct: async function(req, res) {
        const productList = await ProductSchema.findOne({codigo:codigo},
                                                        (err, products) => {
            err? 
                 req.flash('errrormsg', 'producto no encontrado') : 
                 res.render('/products/productFilter');
        });
        
       
    },



}