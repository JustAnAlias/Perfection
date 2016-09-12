/**
 * Created by Rasmus on 12-09-2016.
 */

var now = require('performance-now');
var _ = require('underscore');

module.exports = function () {
    // this.socket and this.user 
    // Objects will be added at runtime
    
    this.initiate = function () {
        
    }
    
    this.data = function (data) {
        console.log("Client Data "+data.toString());
    }
    
    this.error = function (err) {
        console.log("Client Error" + err.toString());
    }
    
    this.end = function () {
        console.log("Client Closed");
    }
}
