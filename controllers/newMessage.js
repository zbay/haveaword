var mongoose = require('mongoose');
var bcrypt = require("bcrypt");
var Room = require(process.cwd() + "/dbmodels/room.js"); Room = mongoose.model("Room");
var sanitizeBody = require("./helpers/sanitizeBody");

module.exports = function(app){
    app.post("/postMessage", sanitizeBody, function(req, res){
        Room.findOne({"name": req.body.roomID}, function(error, room){
            if(room.password && room.password.length){
                if(bcrypt.compareSync(req.body.password, room.password)){
                        Room.findOneAndUpdate({"name": req.body.roomID}, {$addToSet: {messages: {"text": req.body.text, "author": req.body.author}}}, function(err, doc){
                            if(doc && !err){
                                res.json({"message": {"text": req.body.text, "author": req.body.author, "timePosted": Date.now()}});
                            }
                            else{
                                res.json({"error": err});
                            }
        })
                }
            }
            else{
                        Room.findOneAndUpdate({"name": req.body.roomID}, {$addToSet: {messages: {"text": req.body.text, "author": req.body.author}}}, function(err, doc){
                            if(doc && !err){
                                res.json({"message": {"text": req.body.text, "author": req.body.author, "timePosted": Date.now()}});
                            }
                            else{
                                res.json({"error": err});
                            }
        })
            }
        });

    });
}