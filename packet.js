/**
 * Created by Rasmus on 12-09-2016.
 */

// Looking for 00 to interpret ends of packets
var zeroBuffer = new Buffer('00', 'hex');

module.exports = packet = {
    // Params: Array of js objects to be turned into buffers
    build: function (params) {
        var packetParts = [];
        var packetSize = 0;

        params.forEach(function (param) {
            var buffer;
            if(typeof param === 'string') {
                buffer = new Buffer(param, 'utf8');
                // Looking for a buffer full of nothing (because its zero :) )
                buffer = Buffer.concat([buffer, zeroBuffer], buffer.length + 1)

            }
            else if (typeof param === 'number'){
                buffer = new Buffer(2);
                buffer.writeUInt16LE(param,0);
            }
            else {
                console.log("WARNING: Unknown DataType Packet !")
            }
            packetSize += buffer.length;
            packetParts.push(buffer);
        })

        var dataBuffer = Buffer.concat(packetParts, packetSize);

        // Handle packets which are sent together
        // Size-Packet->Size-Packet
        var size = new Buffer(1);
        size.writeUInt8(dataBuffer.length + 1, 0);

        var finalPacket = Buffer.concat([size, dataBuffer], size.length + dataBuffer.length);
        return finalPacket;

    }
}
