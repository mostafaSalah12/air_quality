'use strict'
const AirQualityController = require('./controller.js')

async function router(app, opts) {
  app.get('/pollution/nearest_city', {
    schema: {
      querystring: {
        type: 'object',
        properties: {
          lat: {
            type: 'number',
            minimum: -90,
            maximum: 90
          },
          lon: {
            type: 'number',
            minimum: -180,
            maximum: 180
          }
        },
        required: ['lat', 'lon']
      }
    }
  }, async(request, reply) => {
    const { lat, lon } = request.query
    const response = await AirQualityController.getCityAirQuality(lat, lon)
    reply.send(response)
  })

  app.get('/pollution/paris', async(request, reply) => {
    const response = await AirQualityController.getParisAirQuality()
    reply.send(response)
  })

}

module.exports = router