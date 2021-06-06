module.exports = {
  Mutation: {
    createProcedure(_, args, ctx) {
      return ctx.db.procedure.create({
        data: {
          ...args,
        },
      })
    },
  },
}
