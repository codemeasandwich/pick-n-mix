
if ( ! Array.prototype.merge) {
 Array.prototype.merge = function(arrays) {
   return [].concat.apply(this, arrays);
 };
}
