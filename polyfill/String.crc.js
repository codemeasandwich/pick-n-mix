//+++++++++++++++++++++++++++++ Part of the CRC hashing
//+++++++++++++++++++++++++++++++++++++++++++++++++++++

// http://stackoverflow.com/questions/18638900/javascript-crc32

function genCRCTable(){
    var c, crcTable = [];
    for(var n =0; n < 256; n++){
        c = n;
        for(var k =0; k < 8; k++){
            c = ((c&1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
        }
        crcTable[n] = c;
    }
    return crcTable;
}

var crcTable = genCRCTable();

if ( ! String.prototype.crc) {
 String.prototype.crc = function(){

    var crc = 0 ^ (-1);

    for (var i = 0; i < this.length; i++ ) {
        crc = (crc >>> 8) ^ crcTable[(crc ^ this.charCodeAt(i)) & 0xFF];
    }

    return (crc ^ (-1)) >>> 0;

 }
}

module.exports = "String.prototype.crc"
