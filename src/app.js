//declarations
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors'); 
const ejs_engine = require('ejs-mate');
const app = express();
const routes = require("./routes/routes");
require('./model/db');

//middwares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//settings
app.set('views' ,path.join(__dirname,'views'));
app.engine('ejs', ejs_engine)
app.set('view engine','ejs');
app.set('PORT',process.env.PORT || 3000);
app.set('json spaces', 2); 

//routes
app.use('/',routes);
 



//server
app.listen(app.get('PORT'), ()=>{
    console.log(`Server on Port ${app.get('PORT')}`);
});