/**
* Promise method to take an object of Promises to forfill. Works like Promise.all
*
* @method toObject
* @param {object} of Promises to forfill
* @return {Promise} of promises wrapped in object
*
* @example Promise.group({first:p1, other:p2, p3, last:p4}).then(({first, last}) => {
*
*/
if ( ! Promise.prototype.group) {

    Promise.group = function(object) {

      let promisedProperties = [];
      const objectKeys = Object.keys(object);

      objectKeys.forEach((key) => promisedProperties.push(object[key]));

      return Promise.all(promisedProperties)
        .then((resolvedValues) => {
          return resolvedValues.reduce((resolvedObject, property, index) => {
            resolvedObject[objectKeys[index]] = property;
            return resolvedObject;
          }, object);
        });
    }

} else {
   throw new Error("Promise.group is already defined")
}

module.exports = "Promise.prototype.group"
