"use strict";

module.exports = function schemaQL(schemas){
/*
var buildSchema = require('graphql').buildSchema;

const schemas = require("./schemas")
*/
const descriptions = {}, types = {}

Object.keys(schemas).forEach( typeName => {

  types[typeName] = schemas[typeName].model;
  if(schemas[typeName].description)
  descriptions[typeName] = schemas[typeName].description;
})

  const allTypes = Object.keys(types);


  const result = allTypes.reduce((schemaString,groupName) => {

  const mappingOfLineToComments = types[groupName].split(/\r|\n/g).reduce((mappingOfLineToComments, line) =>{
  if(line.includes("//")){
  mappingOfLineToComments.comments = mappingOfLineToComments.comments || {}
  mappingOfLineToComments.comments[line.split(":")[0].trim()] = line.split("//")[1].trim()
  mappingOfLineToComments.lines.push(line.split("//")[0])
  } else {
  mappingOfLineToComments.lines.push(line)
  }
  return  mappingOfLineToComments
} ,{lines:[],comments:""})

  const scema = mappingOfLineToComments.lines.join(`
  `)

const description = `
# ${(groupName in descriptions)?descriptions[groupName].split(/\r|\n/g).join(`
#`):(!mappingOfLineToComments.comments)?`No docs found for "${groupName}"?.. add some!`:``} ${
mappingOfLineToComments.comments && Object.keys(mappingOfLineToComments.comments).map(lineType => `
#* **${lineType}** - ${mappingOfLineToComments.comments[lineType]}`) }`;

  return `
${description}
type ${groupName}${scema.replace(/!/g,"")}

${description}
input Input${groupName}${allTypes.reduce((body,type) => body.replace(new RegExp(`\\b${type}`),`Input${type}`),scema)}

` + schemaString}, "");
return result
}
//console.log(result)
//module.exports = result
//module.exports = buildSchema(result);
