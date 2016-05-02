var mongoose = require('mongoose');
var Room = require(process.cwd() + "/dbmodels/room.js"); Room = mongoose.model("Room");
var sanitizeBody = require("./helpers/sanitizeBody");

module.exports = function(app){
    app.post("/checkPrivate", function(req, res){
        Room.findOne({"name": req.body.roomID}, function(err, doc){
            console.log(doc);
            if(doc.password){
                res.json({"private": true});
            }
            else{
            res.json({"private": false});
            }
        })
    });
}