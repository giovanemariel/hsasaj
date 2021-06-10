const { GraphQLServer } = require('graphql-yoga')
const { PrismaClient } = require('@prisma/client')
const {
  addResolversToSchema,
  loadSchemaSync,
  GraphQLFileLoader,
} = require('graphql-tools')
const importMiddlewares = require('./middlewares')

const prisma = new PrismaClient()

const resolvers = require('./graphql/resolvers')

const schema = loadSchemaSync('./**/*.graphql', {
  loaders: [new GraphQLFileLoader()],
})

const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers,
})

const server = new GraphQLServer({
  schema: schemaWithResolvers,
  context: (request) => ({
    ...request,
    db: prisma,
  }),
  middlewares: [...importMiddlewares],
})

module.exports = server
