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
