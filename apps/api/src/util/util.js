const { sign } = require('jsonwebtoken')

const issueToken = (payload, options) =>
  sign(payload, process.env.JWT_SECRET, { expiresIn: '8h', ...options })

module.exports = { issueToken }
