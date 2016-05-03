function routers(app){ //all of the app's API controllers
var newRoom = require("./newRoom.js"); newRoom(app);
var privacy = require("./privacy.js"); privacy(app);
var newRoom = require("./newRoom.js"); newRoom(app);
var newMessage = require("./newMessage.js"); newMessage(app);
var getMessages = require("./getMessages.js"); getMessages(app);
}

module.exports = routers;