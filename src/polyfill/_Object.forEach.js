/**
* @description Object method to provide the same functionality as the Arrays forEach
*
* @method forEach
* @param {Function} callback run for each property in the object
* @param {Bool} all only fire callback in basic value. e.g. number, strings, bools & nasted objects
*
* @example var a = {'x':123}; a.forEach(function(prop,name){ alert(name+" is "+prop) })
*
* !!! >> " matchExpr[type].exec is not a function " BY jQuary >:( when clicking anywhere
* !!! >> after calling " $(document).on("click", "a", function(evt) { alert(123)}) "
*
if ( ! Object.prototype.forEach) {
   Object.prototype.forEach = function(callback, all){

      for (var key in this) {
        if (this.hasOwnProperty(key)) {
          if (all || typeof this[key] == "string"
                  || typeof this[key] == "array"
                  || typeof this[key] == "object"
                  || typeof this[key] == "number"
                  || typeof this[key] == "boolean") {
            callback(this[key],key,this);
          }
        }
      }
   }
}
