
function routers(app){ //all of the app's API controllers
var newRoom = require("./newRoom.js"); newRoom(app);
}

module.exports = routers;