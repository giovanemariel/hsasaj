const path = require('path')
const { mergeResolvers } = require('@graphql-tools/merge')
const { loadFilesSync } = require('@graphql-tools/load-files')

const resolversArray = loadFilesSync(path.join(__dirname, './**/*Resolver.*'))
module.exports = mergeResolvers(resolversArray)

// const Query = require('./Query')
// const Mutation = require('./Mutation')

// module.exports = {
//   Query,
//   Mutation,
// }
