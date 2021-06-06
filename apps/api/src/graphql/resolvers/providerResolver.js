module.exports = {
  Mutation: {
    async createProvider(_, args, ctx) {
      return await ctx.db.provider.create({
        data: {
          ...args,
        },
      })
    },
  },

  Query: {
    async providers(_, args, ctx) {
      return await ctx.db.provider.findMany()
    },
  },
}
