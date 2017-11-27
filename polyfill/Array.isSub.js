
// var PlayerOne = ['B', 'C', 'A', 'D'];
// var PlayerTwo = ['D', 'C'];
// PlayerTwo.isSub(PlayerOne) // true
if ( ! Array.prototype.isSub) {
 Array.prototype.isSub = function(subArray) {
   return !this.some(function(val) { return subArray.indexOf(val) === -1 });
 };
}
