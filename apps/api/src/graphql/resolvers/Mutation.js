function createSpecialty(_, args, ctx) {
  return ctx.db.specialty.create({
    data: {
      ...args,
    },
  })
}

module.exports = {
  createSpecialty,
}
