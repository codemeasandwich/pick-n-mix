
const schemaQL = require("./schemaQL")
const schemas = require("./sample")

describe('graphql Scheam Builder', () => {

        it('should work with sample', () => {
          expect(schemaQL(schemas)).toMatchSnapshot();
          })
})
