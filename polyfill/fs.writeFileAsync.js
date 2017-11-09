
//=====================================================
//================================= FS write File Async
//=====================================================

if(global.process) {

  let fs = require(`fs`);

  if ( ! fs.writeFileAsync) {
    fs.writeFileAsync = function(){
      var deferred = Promise.defer();
      var args = Array.prototype.slice.call(arguments);
      args.push(function cb(err) {
          if (err)
              deferred.reject(err);
          else
              deferred.resolve();
      })
      fs.writeFile.apply(null,args);
      return deferred.promise;
    }
  }

  module.exports = "fs.writeFileAsync"

}
