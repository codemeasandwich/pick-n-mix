/*

if ( ! Object.prototype.toQueryParams) {
   Object.prototype.toQueryParams = function(){
      let source = this;
      var array = [];

      for(var key in source) {
         array.push(encodeURIComponent(key) + "=" + encodeURIComponent(source[key]));
      }

      return array.join("&");
   }
   extesionNames.push("Object.prototype.toQueryParams");
}

*/
