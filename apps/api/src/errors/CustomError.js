class CustomError extends Error {
  constructor(message, code, extensions) {
    super(message)

    const name = code
      .split('_')
      .map(
        (word) => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase(),
      )
      .join('')

    Object.defineProperty(this, 'name', { value: name })

    this.extensions = {
      code,
      ...extensions,
    }
  }
}

module.exports = {
  CustomError,
}
