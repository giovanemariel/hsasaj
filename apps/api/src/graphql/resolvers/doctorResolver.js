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
    async deleteDoctor(_, args, ctx) {
      return await ctx.db.doctor.delete({
        where: {
          id: args.id,
        },
      })
    },
  },

  Query: {
    async doctors(_, args, ctx) {
      return await ctx.db.doctor.findMany()
    },
  },
}
