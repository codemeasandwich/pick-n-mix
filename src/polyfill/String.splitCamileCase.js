/**
 * @description String method that split on the Capital letters
 *
 * @method splitCamileCase
 * @returns {Array} array if stub strings set to lower case
 *
 * @example "HopJs".splitCamileCase() // ["hop","js"]
 */

if ( ! String.prototype.splitCamileCase) {
  String.prototype.splitCamileCase = function(){
    return this.split(/(?=[A-Z])/)
               .map(function(s) {
                        return s.trim().toLowerCase();
                    });
  }
}

module.exports ="String.prototype.splitCamileCase"
