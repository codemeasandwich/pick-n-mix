# utils

## deepRequire

**deepRequire** will require all sub-files in a folder as a nasted Object.

You must supply the path to the folder
`deepRequire(dirname)`
Your can also pass an Array of file extensions. Default:`["js"]`
`deepRequire(dirname,exts)`

### Example:

    tools/
     ├─ index.js
     ├─rest/
     │   ├─ get.js
     │   └─ post.js
     └─ list/
         └─ points.js

In **tools.index.js**
```JS
// index.js start
const deepRequire = require('pick-n-mix/utils/deepRequire')
module.exports = deepRequire(__dirname);
// index.js end
```

In you service code

```JS
const tools = require('./tools')

tools.rest.get()
```

## promisify

**promisify** takes an Object with Async functions using callback functions and loops of the first level attributes wrapping them in a Promise

You must supply the object holding the Async functions. It will then wrap all attributes

`promisify(obj)`

Your can also pass an Array of attributes **not** to wrap.

`promisify(obj,["skip"])`

### Example:

Setup you worker object with two function attributes "**get_pic**" and "**name**"
```JS
const user = {
  get_pic:function(next){
    $.ajax({
      url: "/user/pic/meta",
      error: function(xhr,status,error){
        next(error)
      },
      success: function(result){
        next(null,result)
      }
    });
  },
  name: function(){ return "Bob" }
}
```

Wrap the worker but skip the "name" function
```JS
const promisify = require('pick-n-mix/utils/promisify')
const userP = promisify(user,["name"]);
```

Use your newly wrapped worker

```JS
userP.get_pic().then( function(result){
  console.log(result)
}).catch( function(err){
  console.error(err)
})

console.log(userP.name()) // "bob"
```
