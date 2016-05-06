var mongoose = require('mongoose');
var Room = require(process.cwd() + "/dbmodels/room.js"); Room = mongoose.model("Room");
var sanitizeBody = require("./helpers/sanitizeBody");

module.exports = function(app){
    app.post("/getAllMessages", sanitizeBody, function(req, res){
        Room.findOne({"name": req.body.roomID}, function(err, doc){
            if(doc && !err){
                res.json({"messages": doc.messages, "expiration": doc.expiration});
            }
            else{
                res.json({"error": err});
            }
        })
    });
}