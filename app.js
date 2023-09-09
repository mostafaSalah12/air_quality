const config = require('./utils/config')
const buildFastify = require('./server')
const connectDB = require('./database/mongo')
const parisCronJob = require('./core/paris_cron_job')

async function startServer() {
  await connectDB()
  parisCronJob()

  const fastify = await buildFastify()
  try {
    await fastify.listen({ port: config.PORT })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

startServer()
