module.exports = {
  Mutation: {
    createPatient(_, args, ctx) {
      return ctx.db.patient.create({
        data: {
          ...args,
          authorizations: args.authorizations
            ? {
                create: { ...args.authorizations },
              }
            : undefined,
        },
      })
    },

    updatePatient(_, args, ctx) {
      return ctx.db.patient.update({
        where: { id: args.id },
        data: {
          ...args,
          authorizations: args.authorizations
            ? {
                upsert: {
                  where: { id: args.authorizations.id || '' },
                  create: { ...args.authorizations },
                  update: { ...args.authorizations },
                },
              }
            : undefined,
        },
      })
    },
  },

  Query: {
    async patients(_, args, ctx) {
      return await ctx.db.patient.findMany({
        include: {
          operator: true,
          authorizations: {
            include: {
              doctor: true,
              procedure: true,
              provider: true,
              internment: true,
            },
          },
        },
      })
    },
  },
}
