var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var RoomSchema = new Schema({"name": {type: String, required: true}, "expiration": Date, "password": String,
"messages": [{"text": {type: String, required: true}, "author": String, "timePosted": {type: Date, default: Date.now}}]});

RoomSchema.index({"expiration": 1}, {expireAfterSeconds: 43200});

mongoose.model('Room', RoomSchema);