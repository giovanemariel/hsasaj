const { GraphQLServer } = require('graphql-yoga')
const { PrismaClient } = require('@prisma/client')
const { loadFilesSync, mergeTypeDefs } = require('graphql-tools')
const path = require('path')

const prisma = new PrismaClient()

const { AuthDirective } = require('./directives/AuthDirective')
const importMiddlewares = require('./middlewares')
const { selectFields } = require('./util')

const loadSchema = loadFilesSync(path.join(__dirname, './**/*.graphql'))
const typeDefs = mergeTypeDefs(loadSchema)
const resolvers = require('./graphql/resolvers')

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: (request) => ({ ...request, db: prisma, selectFields }),
  middlewares: [...importMiddlewares],
  schemaDirectives: { auth: AuthDirective },
})

module.exports = server
