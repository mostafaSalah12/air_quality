const config = require('./utils/config')
const buildFastify = require('./server')
const connectDB = require('./database/mongo')
const parisCronJob = require('./core/paris_cron_job')

async function startServer() {
  await connectDB()
  parisCronJob()

  const fastify = await buildFastify()
  fastify.listen(config.PORT, (err, address) => {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
    fastify.log.info(`Server listening on ${address}`)
  })
}

startServer()
