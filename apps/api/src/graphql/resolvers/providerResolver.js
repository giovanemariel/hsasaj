module.exports = {
  Mutation: {
    createProvider(_, args, ctx) {
      return ctx.db.provider.create({
        data: {
          ...args,
        },
      })
    },
  },
}
