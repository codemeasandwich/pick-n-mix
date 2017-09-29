
const errorRegister = require('./index').default;

errorRegister(["AuthorizationError","a","b"])

const AuthorizationError = require('./index').AuthorizationError

console.log(
  new AuthorizationError("boo")
)
/*
errorRegister("AuthorizationError");

throw new AuthorizationError("Boo")
*/
