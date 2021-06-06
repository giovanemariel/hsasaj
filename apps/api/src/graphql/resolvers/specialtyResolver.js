module.exports = {
  Mutation: {
    createSpecialty(_, args, ctx) {
      return ctx.db.specialty.create({
        data: {
          ...args,
        },
      })
    },
  },
}
