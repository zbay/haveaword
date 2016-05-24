// this script will delete every room more than 24 hours old, once every 24 hours, as configured with Heroku Scheduler
"use strict";
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;
var Room = require(process.cwd() + "/dbmodels/room.js"); Room = mongoose.model("Room");
var dailySeconds = 86400;

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/haveaword', function (err, db)
{
 if (err) {
      throw new Error('Database failed to connect!');
   } else {
      console.log('Successfully connected to MongoDB.');

var now = Date.now()/1000;
var iterated = 0;

Room.find({}, function(error, docs){
    if(docs && !err){
    console.log("docs: " + docs);
    for(let i = 0; i < docs.length; i++){
        console.log("doc: " + docs[i]);
     let then = (new Date(docs[i].expiration).getTime())/1000;
     if((now - then) > dailySeconds){
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