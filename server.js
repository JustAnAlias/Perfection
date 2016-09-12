/**
 * Created by Rasmus on 12-09-2016.
 */
// Import required libraries
require(__dirname + '/Resources/config.js');
var fs = require('fs');
var net = require('net');

// Load Initializer
var init_files = fs.readdirSync(__dirname + "/Initializer");
init_files.forEach(function (initFile) {
    console.log('Loading initializer:' + initFile);
    require(__dirname + "/Initializer" + initFile);
});

var model_files = fs.readdirSync(__dirname + "/Models");
model_files.forEach(function (modelFile) {
    console.log('Loading Model:' + modelFile);
    require(__dirname + "/Models" + modelFile);
});

maps = {};
var map_files = fs.readdirSync(config.data_path.maps);
map_files.forEach(function (mapFile) {
    console.log('Loading Map:' + mapFile);
    var map = require(config.data_path.maps + mapFile);
    maps[map.room] = map
});

// console.log(maps);

net.createServer(function (socket) {

    console.log("Socket Connected")
    socket.on('error', function (err) {
        console.log("Socket Error" + err.toString());
    });

    socket.on('end', function () {
        console.log("Socket End");

    });

    socket.on('data', function (data) {
        console.log("Socket Data "+data.toString());

    });

}).listen(config.port);

console.log("Initialize Completed, Server running on "+ config.port);
console.log("Environment: " + config.environment);

// Load Data Models
// Load Game Maps data
// Initiate server

