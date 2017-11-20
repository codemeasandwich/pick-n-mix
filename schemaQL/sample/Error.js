
module.exports = {
  description:"Error info",
  model:`{
    type:String!, // type of error
    message:String!, // 'error message'
    args:String!,//arguments
    trace:String!// 'stack trace'
  }`
}
