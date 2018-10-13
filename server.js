// npm packages //
var express = require('express');
var bodyParser = require('body-parser');       /* To get the value from FORM fields */
var morgan = require('morgan');              
var mongoose = require('mongoose');           /* For database, save the query and get the data from mongodb */
var ejs = require('ejs');                     /* View engine */
var engine = require('ejs-mate');              /* write JavaScript code in view page */
var fileUpload = require('express-fileupload');     /* To upload the file to the server */

var app = express();

mongoose.connect("mongodb://root:C12345@ds133920.mlab.com:33920/pinterest" , { useNewUrlParser: true }).then(
  (res) => {
   console.log("Connected to Database Successfully.")
  }
).catch(() => {
  console.log("Conntection to database failed.");
});

//middleware code
app.use(fileUpload());
app.use(express.static(__dirname + '/public'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(morgan('dev'));

// function from pinmain file
require('./routes/pinmain')(app);
require('./routes/pins')(app);   // To call pins file //

app.listen(8090, function(err){
  if(err){
    console.log(err);
  }else {
    console.log('connected to port 8090');
  }
})