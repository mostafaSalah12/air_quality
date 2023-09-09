const Fastify = require('fastify')
const AutoLoad = require('@fastify/autoload')
const logger = require('./utils/logger')
const router = require('./core/router')
const path = require('path')

async function buildFastify() {
// Configure Fastify instance with logger and ajv validation
  const fastify = Fastify({
    logger: logger,
    ignoreTrailingSlash: true,
    ajv: {
      customOptions: {
        allErrors: true,
        removeAdditional: true,
        useDefaults: true,
        coerceTypes: true
      }
    }
  })
  //  load all plugins defined in plugins folder
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: {}
  })
  // load all routes defined in core folder
  fastify.register(router, { prefix: '/api' })

  return fastify
}

module.exports = buildFastify