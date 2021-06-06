module.exports = {
  Mutation: {
    createOperator(_, args, ctx) {
      return ctx.db.operator.create({
        data: {
          ...args,
        },
      })
    },
  },
}
