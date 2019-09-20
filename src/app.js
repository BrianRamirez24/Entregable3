//imports
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors'); 
const exphbs = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
require('./model/db');
require('./passport/local-auth');


//initializers

const app = express();

//settings
app.set('PORT',process.env.PORT || 3000);
app.set('views' ,path.join(__dirname,'views'));  
app.engine('.hbs', exphbs({
        defaultLayout:'main',
        layoutsDir:path.join(app.get('views'),'layouts'),
        partialsDir: join(app.get('views'),'partials'),
        extname:'.hbs'
}))
app.set('.hbs',exphbs);

app.set('json spaces', 2); 



//middwares


app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
//global variables

app.use(session({
    secret : 'secret',
    resave: false,
    saveUninitialized: true,
    cookie:{ secure: true }


}));

app.use(flash());


app.use((req,res,next)=>{
    res.locals.exito_msg = req.flash('exito_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error=req.flash('error');
    next(); 
})

app.use(passport.initialize());

app.use(passport.session())
app.use(express.urlencoded({extended:false}));


//static files




//routes
app.use(require("./routes/routes"));
app.use(require("./routes/routeCliente"));
app.use(require("./routes/routeProduct"));
app.use(require("./routes/routeUser"));
 
 



//server
app.listen(app.get('PORT'), ()=>{
    console.log(`Server is running on Port ${app.get('PORT')}`);
});