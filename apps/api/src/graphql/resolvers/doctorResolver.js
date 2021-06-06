module.exports = {
  Mutation: {
    async createDoctor(_, args, ctx) {
      return await ctx.db.doctor.create({
        data: {
          ...args,
          specialties: {
            connect: {
              id: args.specialties,
            },
          },
        },
      })
    },
  },
}
