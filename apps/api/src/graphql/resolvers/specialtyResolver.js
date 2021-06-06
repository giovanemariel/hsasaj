module.exports = {
  Mutation: {
    async createSpecialty(_, args, ctx) {
      return await ctx.db.specialty.create({
        data: {
          ...args,
        },
      })
    },
  },
}
