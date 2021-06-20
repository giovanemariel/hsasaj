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

    async deletePatient(_, args, ctx) {
      return await ctx.db.patient.delete({
        where: {
          id: args.id,
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
    async patients(_, args, { db, selectFields }, info) {
      return await db.patient.findMany({
        ...selectFields(info),
      })
    },
    async patient(_, args, { db, selectFields }, info) {
      return await db.patient.findUnique({
        where: {
          id: args.id,
        },
        ...selectFields(info),
      })
    },
  },
}
