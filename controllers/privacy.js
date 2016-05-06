var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Room = require(process.cwd() + "/dbmodels/room.js"); Room = mongoose.model("Room");
var sanitizeBody = require("./helpers/sanitizeBody");

module.exports = function(app){
    app.post("/checkPrivate", sanitizeBody, function(req, res){
        Room.findOne({"name": req.body.roomID}, function(err, doc){
            if(!doc){
                res.json({"exists": false});
            }
            else{
                if(doc.password && doc.password.length){
                    res.json({"private": true, "exists": true});
                }
                else{
                    res.json({"private": false, "exists": true});
                }   
            }
        })
    });
    app.post("/login", sanitizeBody, function(req, res){
        Room.findOne({"name": req.body.roomID}, function(err, doc){
            if(err || !doc){
                res.json({"error": "This room is unavailable or has been deleted."});
            }
            else{
                if(bcrypt.compareSync(req.body.password, doc.password)){
                    res.json({"success": "Correct password! The room should display momentarily."});
                }
                else{
                    res.json({"error": "Wrong password! Please try again."});
                }
            }
        });
    });
}