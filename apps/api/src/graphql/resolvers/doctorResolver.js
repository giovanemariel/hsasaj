module.exports = {
  Mutation: {
    createDoctor(_, args, ctx) {
      return ctx.db.doctor.create({
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
