
// Import required libraries
var args = require('minimist')(process.argv.slice(2));
var extend = require('extend');

// Store environment variable
var environment = args.env || "test";

// Common Config
var common_conf = {
    name: "SemPro game Server",
    version: "",
    environment: environment,
    max_player: 100,
    data_path: {
        items: __dirname + "\\Game Data\\" + "Items\\",
        maps: __dirname + "\\Game Data\\" + "Maps\\",

    },
    starting_zone: "rl_map_home"

};

// Environment specific config
var conf = {
    production: {
        ip: args.ip || "0.0.0.0",
        port: args.port || 8081,
        database: "mongodb://127.0.0.1/mmosrv_prod"
    },
    test: {
        ip: args.ip || "0.0.0.0",
        port: args.port || 8082,
        database: "mongodb://127.0.0.1/mmosrv_test"
    }

};

extend(false, conf.production, common_conf);
extend(false, conf.test, common_conf);

module.exports = config = conf[environment];
