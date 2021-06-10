const { CustomError } = require('../errors')

module.exports = {
  catchErrorsMiddleware: async (resolve, root, args, context, info) => {
    try {
      return await resolve(root, args, context, info)
    } catch (error) {
      if (error instanceof CustomError) {
        throw error
      }
      console.log('Error: ', error)
      throw new CustomError('Internal Server Error', 'INTERNAL_SERVER_ERROR')
    }
  },
}
