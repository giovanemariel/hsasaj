const { compare, hash } = require('bcryptjs')
const { issueToken } = require('../../util/util')

module.exports = {
  Mutation: {
    async signin(_, { email, password }, { db }) {
      const user = await db.user.findUnique({
        where: {
          email,
        },
      })

      if (!user) {
        throw new Error('Usuário ou senha incorreto!')
      }

      const isValid = await compare(password, user.password)

      if (!isValid) {
        throw new Error('Usuário ou senha incorreto!')
      }

      const { id: sub, role } = user
      const token = issueToken({ sub, role })

      return {
        token,
        user,
      }
    },

    async signup(_, args, { db }) {
      const password = await hash(args.password, 10)

      const user = await db.user.create({
        data: {
          ...args,
          password,
        },
      })

      const { id: sub, role } = user
      const token = issueToken({ sub, role })

      return {
        token,
        user,
      }
    },
  },

  Query: {
    async user(_, args, ctx) {
      return await ctx.db.user.findMany()
    },
  },
}
