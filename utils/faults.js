class Faults extends Error {

  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode

  }

  // @Desc: Throw an error
  // @Params: message, statusCode
  // @Access: Public
  // @Return: Error
  static throw(message, statusCode = 400) {
    const error = new Faults(message, statusCode)
    throw error
  }

}

module.exports = Faults
