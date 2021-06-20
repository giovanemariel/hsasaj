module.exports = {
  Mutation: {
    async deleteAuthorization(_, args, ctx) {
      return await ctx.db.authorization.delete({
        where: {
          id: args.id,
        },
      })
    },
  },

  Query: {
    async authorizations(_, args, { db, selectFields }, info) {
      const teste = await db.authorization.findMany({
        ...selectFields(info),
      })
      return teste
    },
  },
}
