const { GraphQLServer } = require('graphql-yoga')
const {
  loadSchemaSync,
  GraphQLFileLoader,
  addResolversToSchema,
} = require('graphql-tools')
const { PrismaClient } = require('@prisma/client')
const resolvers = require('./graphql/resolvers')

const prisma = new PrismaClient()

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
})

module.exports = server
