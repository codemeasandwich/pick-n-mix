
// [1,2,3,4,5,6].chunk(3) // [[1,2,3],[4,5,6]]

if ( ! Array.prototype.chunk) {
 Array.prototype.chunk = function(size) {
   const arrays = [];
   while (this.length > 0)
       arrays.push(this.splice(0, size));
   return arrays
 };
}
