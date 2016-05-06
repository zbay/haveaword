var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Room = require(process.cwd() + "/dbmodels/room.js"); Room = mongoose.model("Room");
var sanitizeBody = require("./helpers/sanitizeBody");
var dayMilliseconds = (24*60*60*1000);
var weekMilliseconds = dayMilliseconds * 7;
var monthMilliseconds = dayMilliseconds * 31;

module.exports = function(app) {
    app.post("/newRoom", sanitizeBody, function(req, res){
        if(req.body.roomName && req.body.duration){
            var urlSafeName = encodeURIComponent(req.body.roomName);
            var expires = null;
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
            if(Room.count({"name": urlSafeName}, function(err, count){
                if(count == 0 || count == -1 || count == null){
                    var newRoom;
                    if(req.body.password){
                    newRoom = new Room({"name": urlSafeName, expiration: expires, 
                    password: bcrypt.hashSync(req.body.password.trim().substr(0, 200), 10)});   
                    newRoom.save(function(err, msg){
                        if(msg && !err){
                            console.log("safeName: " + urlSafeName);
                            res.json({"returnID": urlSafeName});
                        }
                        else{
                            console.log(err);
                            res.json({"error": err});
                        }
                    });
                    }
                    else{
                        newRoom = new Room({"name": urlSafeName, expiration: expires});
                        newRoom.save(function(err, msg){
                        if(msg && !err){
                            console.log("safeName: " + urlSafeName);
                            res.json({"returnID": urlSafeName});
                        }
                        else{
                            console.log(err);
                            res.json({"error": err});
                        }
                    });
                    }
                }
            else{
                res.json({"error": "That room name is currently taken! Please try another name."});
            }
            })){
            }
        }
        else{
            res.json({"error": "Make sure to choose a name for your room."});
        }
    });
}