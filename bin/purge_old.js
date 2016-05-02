// this script will delete every post more than 24 hours old, once every 24 hours, as configured with Heroku Scheduler
"use strict";
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var Room = require(process.cwd() + "/dbmodels/posting.js"); Room = mongoose.model("Room");
var User = require("../dbmodels/user.js"); User = mongoose.model("User");
var dailySeconds = 86400;

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/opine', function (err, db)
{
 if (err) {
      throw new Error('Database failed to connect!');
   } else {
      console.log('Successfully connected to MongoDB.');

var now = Date.now()/1000;
var iterated = 0;

Room.find({}, function(error, docs){
    if(docs && !err){
    for(let i = 0; i < docs.length; i++){
     let then = (new Date(docs[i].expiration).getTime())/1000;
     if((now - then) > dailySeconds){
        console.log("should delete: " + docs[i]._id);
        Room.remove({_id: ObjectId(docs[i]._id)}, function(err, msg){
            console.log("err: " + err);
            console.log("msg: " + msg);
            iterated++;
            });
        }
      if(iterated == docs.length-1){
          process.exit();
      }  
    }   
    }
    else{
        console.log("error: " + error);
        process.exit();
    }
});
}
});