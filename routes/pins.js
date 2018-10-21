//Path to place the file into exact folder //
var path = require('path');
var Pin = require('../models/pin');


// route for create  //
module.exports = function(app){
    app.route('/pins/create')
    //get data
    .get(function(req,res,next){
      res.render('pins/create');
    })
    //post data
    .post(function(req,res,next){

      // Pin object variable to map properties //
      var pin = new Pin();
      pin.titleOfPin = req.body.titleOfPin;
      pin.description = req.body.description;
      pin.username = req.body.username;
      pin.isSave = false;  // always false when user create a pin at initial time //
      // File required when user is creating a new pin  
      if(!req.files)
        return json('error');
      //When user wants to upload a file it required unique number //
      let sampleFile = req.files.sampleFile;
      let fileName = Math.random().toString(26).slice(2) + '.jpg';
      //All image will be saved inside below path //
      let path = './public/Files/' + fileName;   
      pin.path = '/Files/' + fileName;

      //move file from client machine to the server //
      sampleFile.mv(path, function(err){
        if(err)
          return res.status(500).send(err);
      })

      // save Pin to the mongodb database //
        pin.save(function(err, dbPin){
        if(err) throw err;      //if pin didn't save //
        res.redirect('/pins/index', { pins: []});  // save successfully //
      })

    })

    // Route for pins/index and querying all the pins from the  database //
    app.get('/pins/index', function(req,res,next){
      Pin.find({},function(err, pins){
        res.render('pins/index', {pins: pins});
      })

    })
    // delete function
    app.get('/pins/delete/:id', function(req,res,next){
      Pin.find({_id: req.params.id}).remove()
        .exec(function(err, foundPin){
          res.redirect('/pins/index');
    })
   
  }) 
  } 
