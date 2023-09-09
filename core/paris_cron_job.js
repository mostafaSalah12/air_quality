const cron = require('node-cron')
const IQairService = require('./iqair_service')
const logger = require('../utils/logger')
const { ParisAirQuality } = require('./models/paris_air_quality')
const Faults = require('../utils/faults')

async function saveParisAirQuality() {
  const latitude = 48.856613, longitude = 2.352222

  try {
    const response = await IQairService.getAirQualityNearestCity(latitude, longitude)
    if (!response || response.status !== 'success') {
      logger.error('Error getting air quality from IQAir in cron job')
      return
    }

    const { current: { pollution }, city } = response.data
    if (!pollution || !pollution.ts || !pollution.aqius || !pollution.aqicn || !city) {
      logger.error('Invalid air quality data:', response.data)
      return
    }

    const parisAirQuality = new ParisAirQuality({
      ts: pollution.ts,
      aqius: pollution.aqius,
      aqicn: pollution.aqicn,
      city
    })

    await parisAirQuality.save()
    logger.info('Paris air quality saved successfully')
  } catch (error) {
    logger.error(error)
    Faults.throw('Error saving Paris air quality', 500)
  }
}

function parisCronJob() {
  cron.schedule('* * * * *', async() => {
    try {
      await saveParisAirQuality()
    } catch (error) {
      logger.error(error)
    }
  })
}

module.exports = parisCronJob