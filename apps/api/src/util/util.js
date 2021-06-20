const { sign } = require('jsonwebtoken')
const { PrismaSelect } = require('@paljs/plugins')

const issueToken = (payload, options) =>
  sign(payload, process.env.JWT_SECRET, { expiresIn: '8h', ...options })

const selectFields = (info) => new PrismaSelect(info).value
// if (options) {
//   const { include = [], skip = [] } = options
//   fields = fields.concat(include)
//   fields = fields.filter(f => !skip.includes(f))
// }

module.exports = { selectFields, issueToken }
