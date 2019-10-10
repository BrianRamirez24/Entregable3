const ClientSchema = require('../model/cliente');

module.exports = {

    createClient: async function(req, res){
        const { tipod, 
                doc,
                nombre, 
                apellidos,
                genero, 
                direccion, 
                telefono, 
                celular } = req.body;
    try{
        if(!doc || doc.length < 4) {
            res.status(401).send('ingrese un numero de documento valido');
        }           

        else if(!nombre || nombre.length == 0 ){
            res.status(401).send('ingrese un nombre valido');

        }else if(!apellidos || apellidos.length == 0){
            res.status(401).send('ingrese un apellido valido');
        
        }else if(!direccion || direccion.length < 10){
            res.status(401).send('no se reconce direccion por favor ingrese una direccion valida');
        
        }
        else if(!telefono || telefono.length < 20){
            res.status(401).send('por favor ingrese un telefono valido');
        
        }
        
        else if(!celular || celular.length < 20){
            res.status(401).send('por favor ingrese un celular valido');
        
        }
        
        else{
           await ClientSchema.findOne({doc: doc})
                             .then((cliente)=>{
              if(cliente){

                res.status(401).send('el cliente ya esta registado');

              }
              else{

                  const products = new ClientSchema({
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

                   await products.save( 
                       err =>{

                        err ?
                        res.send('no se almacenaron datos intente nuevamente') : 
                        req.send( 'producto registrado exitosamente');
                        
                })
             
          }
         
        
        })



        .catch(err => console.log( err ));
    }
} catch(error){
        console.log('error: ', error);
        res.send(JSON.stringify(error));
    }

    },

    listClient: async function(req, res) {
        const clientList = await ClientSchema.find().sort({name: 'asc'});
        res.status(200).send(clientList);
    },

    updateClient: async function(req, res){

        const { tipod, 
                doc,
                nombre, 
                apellidos,
                genero, 
                direccion, 
                telefono, 
                celular } = req.body;
            const { id } = req.params.id;

        const objProduct = {
            tipod:"", 
            doc:"",
            nombre:"", 
            apellidos:"",
            genero:"", 
            direccion:"", 
            telefono:"", 
            celular: ""
        };

        try{


         if(tipod){ objProduct.codigo = tipod;}
         if(doc){objProduct.doc = doc;}
         if(nombre){ objProduct.nombre = nombre; }
         if(apellidos){ objProduct.apellidos = apellidos; }
         if(direccion){ objProduct.direccion = direccion; }
         if(telefono) { objProduct.telefono = telefono; }
         else{
             await ClientSchema.findOneAndUpdate({ id } , {$set : objProduct}, 
                err=> err  ?  res.send('no se pudo actualizar el producto'): 
                              req.send('producto actualziado exitosmante'))
         }

        }catch(error){
            res.status(500).send(error)
        }


    },
    
    destroyClient: async function (req, res){
        try{
            const { id }  = req.params.id;
                await ClientSchema.deleteOne({ id }, err =>{ 
                                                      err ? 
                                                      res.status(401).send('no se elimino el producto') : 
                                                      res.status(200).send('producto eliminado exitosamente')})
        }
        catch(error){

        }
    },

  
    fiterClient: async function(req, res) {
        const productList = await ProductSchema.findOne(
            {codigo:codigo},
            (err,products) => {
                    err?  res.status(404).send('producto no encontrado') : 
                    res.status(200).send(productList);
        });
        
    }



}