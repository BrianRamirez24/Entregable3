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
            req.flash('error','codigo de producto requerido');
            errors.push('codigo de producto requerido');
        }
        if(!nombre){
            req.flash('error','debe ingresar el nombre del producto');
            errors.push('debe ingresar el nombre del producto');
        }
        if(!descripcion){
            req.flash('error','debe de ingresar una descripcion valida al producto');
            errors.push('debe de ingresar una descripcion valida al producto');
        }
        if(!stock){
            req.flash('error','por favor ingrese un stock al producto');
            errors.push('por favor ingrese un stock al producto');
        }
        if(!precio){
            req.flash('error','debe darle un precio');
            errors.push('debe darle un precio');
        
        }
        else{
           ProductSchema.findOne({codigo: codigo})
                             .then((product)=>{
              if(product){

                req.flash('error','el producto ya está registrado');
                errors.push('debe darle un precio');
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
                        req.flash('success_msg','no se almacenaron datos intente nuevamente') : 
                        res.status(200)('success_msg', 'producto registrado exitosamente');
                        res.redirect('/dashboard');
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