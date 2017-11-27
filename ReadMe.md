# pick-n-mix
## a set of tools, untils and polyfulls for writing declarative javascript apps

- [errors](#errors)
    + [Example:](#example)
- [deepRequire](#deeprequire)
- [promisify](#promisify)
- [graphql Scheam Builder](#graphql-scheam-builder)
  * [Overview](#overview)
  * [How to use](#how-to-use)
  * [Using the above code snippets](#using-the-above-code-snippets)

# errors
A extension mechanism for JavaScript errors

The **`errors.registry`** functions registers custom Error constructors

1 **registry** should be passed a `String` **or** `Array` of strings. Representing the names of the errors you want generated.

2 The generated Errors has a signature if
* message - `String`. The description of the problem
* args - `mix`. Any arguments that were used
* rootCause - `Error`. A lower level error are is being wrapped

3 The new Error Object will have some more attributes
* type - `String`. The name of this type of Error
* fileName - `String`. The file name - where this error was created
* lineNumber - `Number`. The line number - where this error was created
* columnNumber - `Number`. The column number - where this error was created
* functionName - `String`. The function name - where this error was created
* createdAt - `Number`. The time the error was create based on hosts time settings.
* rootCause - `Error`. Error that trigger this error. `undefined` if not set
* args - `mix`. Any arguments that were used. `undefined` if not set
* processId - `Number`. The Node process ID if create on a server.  `undefined` **if created in brower**
* userAgent - `String`. The user agent. `undefined` **if created in Node**
  * This can be set on Node by using `err.setUserAgent(req.headers['user-agent'])`


### Example:

#### ES6 modules
During your app startup
```JS
import registry from 'pick-n-mix/errors'

registry("BadInput");
```

Any where you wish to use it
```JS
import { BadInputError } from 'pick-n-mix/errors'
//...
if( ! input){
  throw new BadInputError("missing input",input)
}
//...
```

#### AMD / Node modules
During your startup
```JS
var registry = require('pick-n-mix/errors').registry

registry("Authorization");
```

Any where you wish to use it
```JS
var errors = require('pick-n-mix/errors')
var AuthorizationError = errors.AuthorizationError
//...
if( ! ok){
  throw new AuthorizationError("Bad password",user)
}
//...
```

**🎉 Pro Tip:** You can pass a descriptive string to registry to indicate error subtype

```JS
registry(['Range>InvalidArgument','Internal']);

var invalidErr = new InvalidArgumentError("...")

invalidErr instanceof InvalidArgumentError // true
invalidErr instanceof RangeError           // true
invalidErr instanceof Error                // true

var internalErr = new InternalError("...")

internalErr instanceof InternalError // true
internalErr instanceof RangeError    // false
internalErr instanceof Error         // true
```

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

# graphql Scheam Builder

## Overview

Each custom graphql **type** will have its own file.

The file looks like
```JS
module.exports = {
  description:"Error info",
  model:`{
    type:String!, // type of error
    message:String!, // 'error message'
    args:String!,//arguments
    trace:String!// 'stack trace'
  }`
}
```
This will be outputted

```
 # Error info
 #* **type** - type of error,
 #* **message** - 'error message',
 #* **args** - arguments,
 #* **trace** - 'stack trace'
 type Error{
     type:String,
      message:String,
      args:String,
      trace:String
     }
```
**🛈 Things to know:**
* Each type will **also** have a `Input` version generated for convenience.
```
 # Error info
 #* **type** - type of error,
 #* **message** - 'error message',
 #* **args** - arguments,
 #* **trace** - 'stack trace'
 input InputError{
     type:String,
      message:String,
      args:String,
      trace:String
     }
```


## How to use

Scheam Builder is designed to be use with [deepRequire](https://github.com/codemeasandwich/pick-n-mix/tree/master/utils) to pull in your types.

### An Example schemas:

    sample/
     ├─ index.js
     ├─ Error.js
     ├─ partys.js
     └─ accounts/
         └─ user/
             ├─ index.js
             └─ item.js

[Example Source](https://github.com/codemeasandwich/pick-n-mix/tree/master/schemaQL/sample)


You will need to specify the "Query" and "Mutation" strings

```
const Query = `
  # A GraphQL API for my App
   type Query {
     readUser(id:String):user,
     config:Config,
   }`

const Mutation = `
   type Mutation {
     logError(type:String!, message:String!,args:String!,trace:String!):Error
   }
`
```

`Query` and `Mutation` Api function will map to the same object

```
var root = {
// Query
readUser: (args)=> db.getUser({_id:args.id}),
config: () => fs.readFileAsync(__dirname + "/config.json"),

// Mutation
logError: (args)=>{
  const type      = args.type;
  const message   = args.message;
  const errorArgs = args.args;
  const trace     = args.trace;

  return db.saveError(message,{type,errorArgs},trace)
           .then( x => args ) // return the error back to use
  },
}

```

## Using the above code snippets

```JS

const deepRequire = require('pick-n-mix/utils/deepRequire');
const schemas = deepRequire("./My_schemas_dir");

const schemaQL    = require("pick-n-mix/schemaQL");
const schemaTypes = schemaQL(schemas);

const buildSchema = require('graphql').buildSchema;
const schema = buildSchema(schemaTypes
                            + " " + Query  
                            + " " +  Mutation)

// ================== Express Server
// =================================

const graphqlHTTP = require('express-graphql');
const express     = require('express');

const app = express();

// ======================== Graph QL
// =================================

  app.use('/graphql', graphqlHTTP({
    schema: schema,    rootValue: root,    graphiql: true,
  }));
```
