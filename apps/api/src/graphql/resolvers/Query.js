async function user(_, args, ctx) {
  return await ctx.db.user.findMany()
}

module.exports = {
  user,
}
