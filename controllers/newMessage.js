var mongoose = require('mongoose');
var Room = require(process.cwd() + "/dbmodels/room.js"); Room = mongoose.model("Room");
var sanitizeBody = require("./helpers/sanitizeBody");

module.exports = function(app){
    app.post("/newComment", sanitizeBody, function(req, res){
        Room.findOneAndUpdate({"name": req.body.roomID}, {$addToSet: {messages: {"text": req.body.text, "author": req.body.author}}}, function(err, doc){
            if(doc && !err){
                res.json({"success": "Message successfully posted."});
            }
            else{
                res.json({"error": err});
            }
        })
    });
}