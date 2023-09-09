const Fastify = require('fastify')
const AutoLoad = require('@fastify/autoload')
const logger = require('./utils/logger')
const router = require('./core/router')
const path = require('path')

async function buildFastify() {

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

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: {}
  })

  fastify.register(router, { prefix: '/api' })

  return fastify
}

module.exports = buildFastify