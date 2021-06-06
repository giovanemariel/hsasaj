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
}
