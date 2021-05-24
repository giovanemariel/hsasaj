import { GraphQLServer } from 'graphql-yoga'
import {
  loadSchemaSync,
  GraphQLFileLoader,
  addResolversToSchema,
} from 'graphql-tools'

const schema = loadSchemaSync('./**/*.graphql', {
  loaders: [new GraphQLFileLoader()],
})

const DOCTORS = [
  {
    id: 1,
    name: 'Giovane Mariel',
    council: '11233434BR',
    cpf: '0129287877',
  },
]

const resolvers = {
  Query: {
    doctors: () => DOCTORS,
  },
  Mutation: {
    createDoctor: (_, args) => {
      const doctor = {
        ...args,
        id: DOCTORS.length + 1,
      }
      DOCTORS.push(doctor)
      return doctor
    },
  },
}

const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers,
})

const server = new GraphQLServer({
  schema: schemaWithResolvers,
})

export default server
