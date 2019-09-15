const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const userSchema = require('../model/user');


passport.serializeUser((user,done) => {
    done(null, user.id)
});

passport.deserializeUser(async (id, done)=>{
    const user = await userSchema.findById(id);
    done(null,user); 
});



passport.use('local-signup', new LocalStrategy({
    usernameField : "txtUsername",
    passwordField : "txtPassword",
    passReqToCallback : true
}, async (req, email, password , done) => {
    const user = new userSchema();
    user.email = email;
    user.password = password;
    await user.save()
    .then(()=> console.log("usuario insertado exitosamente"))
    .catch(err => (err) ? console.log('no se registro usuario') : console.log('inserted successfully'));
    done(null, user)
  

}));

