const swagger = require('@fastify/swagger')
const fp = require('fastify-plugin')

async function swaggerDocs(fastify, _options) {
  await fastify.register(swagger, {
    routePrefix: '/docs',
    swagger: {
      info: {
        title: 'air-quality-api',
        description: 'Air quality API documentation.',
        version: '1.0.0'
      },
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here'
      },
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
      tags: [
        // { name: 'user', description: 'User related end-points' }
      ]
    },
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false
    },
    uiHooks: {
      onRequest: function(_request, _reply, next) { next() },
      preHandler: function(_request, _reply, next) { next() }
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    exposeRoute: true
  })
}

module.exports = fp(swaggerDocs)
