module.exports = async function(app, opts) {
  app.setErrorHandler(async(error, request, reply) => {
    if (error.validation) {
      reply.status(400)
        .send({
          error: error.validation[0].message,
          statusCode: 400
        })
    }
    reply
      .status(error.statusCode || 500)
      .send({
        error: error.message,
        statusCode: error.statusCode || 500
      })
  })
}