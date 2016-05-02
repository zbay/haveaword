var mongoose = require('mongoose');
var Room = require(process.cwd() + "/dbmodels/room.js"); Room = mongoose.model("Room");
var sanitizeBody = require("./helpers/sanitizeBody");
let dayMilliseconds = (24*60*60*1000);
let weekMilliseconds = dayMilliseconds * 7;
let monthMilliseconds = weekMilliseconds * 31;

module.exports = function(app) {
    app.post("/newRoom", sanitizeBody, function(req, res){
        if(req.body.roomName && req.body.duration){
            let urlSafeName = encodeURI(req.body.roomName);
            let expires = null;
            switch(req.body.duration){
                case "day":
                    expires = new Date(Date.now() + dayMilliseconds);
                    break;
                case "week":
                    expires = new Date(Date.now() + weekMilliseconds);
                    break;
                case "month":
                    expires = new Date(Date.now() + monthMilliseconds);
                    break;
                case "indefinite":
                    break;
            }
            if(Room.find({"name": urlSafeName}).count() === 0){
                let newRoom = new Room({"name": urlSafeName, expiration: expires});
                newRoom.save(function(err, msg){
                    if(msg && !err){
                        res.json({"returnID": urlSafeName});
                    }
                    else{
                        res.json({"error": err});
                    }
                });
            }
            else{
                res.json({"error": "That room name is currently taken! Please try another name."});
            }
        }
        else{
            res.json({"error": "Make sure to choose a name for your room."});
        }
    });
}