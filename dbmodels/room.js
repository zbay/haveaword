var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var RoomSchema = new Schema({"name": {type: String, required: true}, "expiration": Date, "password": String,
"comments": [{"text": {type: String, required: true}, "author": String, timePosted: {type: Date, default: Date.now()}}]});

mongoose.model('Room', RoomSchema);