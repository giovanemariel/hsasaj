module.exports = {
  Mutation: {
    async createOperator(_, args, ctx) {
      return await ctx.db.operator.create({
        data: {
          ...args,
        },
      })
    },
  },

  Query: {
    async operators(_, args, ctx) {
      return await ctx.db.operator.findMany()
    },
  },
}
