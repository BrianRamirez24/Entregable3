
const Users = require('../model/user');

module.exports = {

  registrarUsuario = async function(req, res){
    try {
  
   const {nombre,
          email, 
          password, 
          password2, 
          roll
          } = req.body
        
       var errors = [];
       var success = [];
  
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
        errors.push({message : 'el usuario ya está registrado'})
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
           bcryst.hash(userss.password , salt ,(err, hash) => {
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
 
 
 
 
 
  }





/* 
module.exports = {
    create: async function(req, res) {
      try {
        let { name, lastname, id, phone, email, area, hospital } = req.body;
        if (!name) {
          res.send(response("name is required").isError(401));
        } else if (!lastname) {
          res.send(response("lastname is required").isError(401));
        } else if (!id) {
          res.send(response("id is required").isError(401));
        } else {
          let request = { name, lastname, id };
          if (phone) request.phone = phone;
          if (email) {
            validateEmail(email)
              ? (request.email = email)
              : res.send(request("Invalid email").isError(401));
          }
          if (area) request.area = area;
          if (hospital) request.hospital = hospital;
  
          const doctor = new Doctors(request);
          await doctor.save(err => {
            err
              ? res.send(
                  response("Something is wrong...").isError(401, { error: err })
                )
              : res.send(response("registered succesfully"));
          });
        }
      } catch (err) {
        res.send(response("Something is wrong...").isError(500, { error: err }));
      }
    },
    read: function(req, res) {
      try {
        Doctors.find().exec((err, doctors) => {
          err
            ? res.send(
                response("Something is wrong...").isError(401, { error: err })
              )
            : res.send(response().setData({ data: doctors }));
        });
      } catch (err) {
        res.send(response("Something is wrong...").isError(500, { error: err }));
      }
    },
    update: function(req, res) {
      try {
        const { name, lastname, id, phone, email } = req.body;
        let objUpdate = {};
        if (name) objUpdate.name = name;
        if (lastname) objUpdate.lastname = lastname;
        if (phone) objUpdate.phone = phone;
        if (email) objUpdate.email = email;
  
        if (id) {
          Doctors.updateOne({ id }, { $set: objUpdate }, err => {
            err
              ? res.send(response("Something is wrong...").isError(401))
              : res.send(response("updated sucessfully"));
          });
        }
      } catch (err) {
        res.send(response("Something is wrong...").isError(401, { error: err }));
      }
    },

    destroy: function(req, res) {
      try {
        Doctors.deleteOne({ id: req.body.id }, err => {
          err
            ? res.send(
                response("Something is wrong...").isError(401, { error: err })
              )
            : res.send(response("deleted successfully"));
        });
      } catch (err) {
        res.send(response("Something is wrong...").isError(500, { error: err }));
      }
    },
    findOne: function(req, res) {
      try {
        const { email, name, lastname } = req.query;
        let query = {};
  
        if (email) query.email = email;
        if (name) query.name = name;
        if (lastname) query.lastname = lastname;
  
        Doctors.findOne(query, (err, doctors) => {
          err
            ? res.send(
                response("Something is wrong...").isError(401, { error: err })
              )
            : res.send(response().setData({ data: doctors }));
        });
      } catch (err) {
        res.send(response("Something is wrong...").isError(500, { error: err }));
      }
    },
    workPlace: function(req, res) {
      try {
        const { id } = req.body,
          { hospital, area } = req.query;
  
        let query = {};
  
        if (hospital) query.hospital = hospital;
        if (area) query.area = area;
  
        Doctors.updateOne({ id: id }, { $set: query }, err => {
          err
            ? res.send(
                response("Something is wrong...").isError(401, { error: err })
              )
            : res.send(response("updated succesfully"));
        });
      } catch (err) {
        res.send(response("Something is wrong...").isError(500, { error: err }));
      }
    }
  };
 */