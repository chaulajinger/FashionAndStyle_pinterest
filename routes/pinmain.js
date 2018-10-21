var Pin = require("../models/pin");

module.exports = function(app){
  app.get('/',function(req,res,next){
    Pin.find({}).then(function(dbPins) {
      res.render('pins/index',  { pins: dbPins});
    })
    
  })
}