module.exports = {
  logInput: async (resolve, root, args, context, info) => {
    const {
      fieldName,
      operation: { operation },
    } = info

    console.log(`LOG: before '${operation} ${fieldName}'`)
    console.log(`1. logInput: ${JSON.stringify(args)}`)
    const result = await resolve(root, args, context, info)
    console.log(`5. logInput`)
    return result
  },

  logResult: async (resolve, root, args, context, info) => {
    console.log(`2. logResult`)
    const result = await resolve(root, args, context, info)
    console.log(`4. logResult: ${JSON.stringify(result)}`)
    return result
  },
}

// const Patient = async (resolve, source, args, ctx, info) => {
//   const {
//     fieldName,
//     operation: { operation },
//   } = info

//   console.log(`LOG: before '${operation} ${fieldName}'`)
//   const result = await resolve(source, args, ctx, info)
//   console.log(`LOG: after '${operation} ${fieldName}'`)
//   return result
// }
