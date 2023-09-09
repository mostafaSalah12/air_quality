module.exports = async function(app, opts) {
  app.setErrorHandler(async(_error, request, reply) => {
    reply.code(404)
      .send({
        error: 'Not Found',
        statusCode: 404,
        message: "I'm sorry, but the api endpoint you are looking for does not exist."
      })

  })
}