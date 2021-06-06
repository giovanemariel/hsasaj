module.exports = {
  Mutation: {
    async createProcedure(_, args, ctx) {
      return await ctx.db.procedure.create({
        data: {
          ...args,
        },
      })
    },
  },
}
