module.exports = {
  Mutation: {
    async createPatient(_, args, ctx) {
      return await ctx.db.patient.create({
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

    async updatePatient(_, args, ctx) {
      return await ctx.db.patient.update({
        where: { id: args.id },
        data: {
          ...args,
          authorizations: args.authorizations
            ? {
                upsert: {
                  where: { id: args.authorizations.id || '' },
                  create: {
                    ...args.authorizations,
                    internment: undefined,
                  },
                  update: {
                    ...args.authorizations,
                    internment: args.authorizations.internment
                      ? {
                          upsert: {
                            create: { ...args.authorizations.internment },
                            update: { ...args.authorizations.internment },
                          },
                        }
                      : undefined,
                  },
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
