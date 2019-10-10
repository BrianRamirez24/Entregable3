
const Users = require('../model/user');

module.exports = {

  registrarUsuario: async (req, res) => {
    try {

   const {email, 
          password, 
          password2, 
          roll} = req.body
  var errors = [];      
  var exito = [];      
  
 
   if(!email || email.length == 0){
       req.flash('error_msg','debe ingresar un email valido');
       errors.push('debe ingresar un email valido');
   }
  if(!password){
     req.flash('error_msg','debe ingresar un a contraseña');
     errors.push('debe ingresar un a contraseña');
   }
   
  if(password != password2){
     req.flash('error_msg','las contraseñas deben coincidir');
     errors.push('las contraseñas deben coincidir');
   }
 
  if(password.length<6){
     req.flash('error_msg','La contraseña debe de ener al menos 6 caracteres');
     errors.push('La contraseña debe de ener al menos 6 caracteres');
   }

   else{

       const resultado = await Users.findOne({email : email});
       console.log(resultado);
       if(resultado){
         
         req.flash('mensajeError', 'el usuario ya está registrado');
         errors.push('La contraseña debe de ener al menos 6 caracteres');
         console.log(req.flash('mensajeError'));
        
       }
       else{

        const userss = new Users(
          {
              email,
              password,
              roll,
              estado:"sin verificar"                     
          }
          );

           userss.password = userss.encryptPassword(password);
           req.flash('mensajeError','usuario creado exitosmamente');
           
           console.log(userss);
     
             /*  await userss.save(
                (err) =>{
                  (err)?
                  res.flash('error','no se logro registrar el usuario intente nuevamente'):
                  res.flash('success_msg','usuario registrado')
                }
              ); */
     
       }
      
           }

          } catch(err){
            console.error(err);
             req.flash('error_msg', err.toString());
             errors.push(err.toString());
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