const { SchemaDirectiveVisitor } = require('graphql-tools')
const { defaultFieldResolver } = require('graphql')
const { CustomError } = require('../errors')
const { verify } = require('jsonwebtoken')

class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field

    field.resolve = this.createAuthResolver(resolve)
  }

  createAuthResolver(resolver) {
    return (_, args, ctx, info) => {
      const Authorization = ctx.request
        ? ctx.request.get('Authorization')
        : ctx.connection.context.Authorization ||
          ctx.connection.context.authorization

      if (!Authorization) {
        throw new CustomError('Unauthenticated!', 'UNAUTHENTICATED_ERROR', {
          detail: 'Token not provided!',
        })
      }

      try {
        const token = Authorization.replace('Bearer ', '')
        const { sub, role } = verify(token, process.env.JWT_SECRET)
        const authUser = { id: sub, role }
        ctx = {
          ...ctx,
          authUser,
        }
      } catch (error) {
        throw new CustomError('Invalid Token!', 'INVALID_TOKEN_ERROR', error)
      }

      const { requires: expectedRole } = this.args
      const { role: userRole } = ctx.authUser

      if (expectedRole && expectedRole !== userRole) {
        throw new CustomError('Unauthorized!', 'UNAUTHORIZED_ERROR', {
          detail: `Required '${expectedRole}' level!`,
        })
      }

      return resolver.apply(this, [_, args, ctx, info])
    }
  }
}

module.exports = { AuthDirective }
