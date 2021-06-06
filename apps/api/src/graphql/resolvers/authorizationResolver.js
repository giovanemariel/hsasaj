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
    async authorizations(_, args, ctx) {
      return await ctx.db.authorization.findMany()
    },
  },
}
