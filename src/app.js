//inits
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const app = express();
const methodOverride = require('method-override');
//const cors = require('cors'); 


//imports
require('./connection/db');
require('./passport/local-auth');




//settings

app.set('PORT',process.env.PORT || 3000);
app.set('views' ,path.join(__dirname,'views'));

app.engine('hbs', exphbs({
    defaultLayout:'main.hbs',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname:'hbs'
}));
app.set('view engine','hbs');
app.set('json spaces', 2); 


// static files
app.use(express.static(path.join(__dirname, 'public')));
//error corregido es app.use no app.set

//middwares


app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use(express.json());

app.use(session({
    secret : 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(flash());


app.use(
    (req, res, next) => {
    
        res.locals.exitomsg = req.flash('exitomsg');

        res.locals.errormsg = req.flash('errormsg');
   
    next();

})

app.use(passport.initialize());
app.use(passport.session())
app.use(express.urlencoded({extended:false}));





//routes


app.use(require("./routes/routeCliente"));
app.use(require("./routes/routeProduct"));
app.use(require("./routes/routeUser"));
 
 



//server
app.listen(app.get('PORT'), ()=>{
    console.log(`Server is running on Port ${app.get('PORT')}`);
});