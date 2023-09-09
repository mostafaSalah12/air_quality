const IQairService = require('./iqair_service')
const logger = require('../utils/logger')
const { ParisAirQuality } = require('./models/paris_air_quality')
const Faults = require('../utils/faults')

async function getCityAirQuality(latitude, longitude) {
  const airQuality = await IQairService.getAirQualityNearestCity(latitude, longitude)
  if (!airQuality || airQuality.status !== 'success') {
    logger.error({
      message: 'Error getting air quality',
      data: airQuality
    })
    throw new Error(`Error getting air quality: ${JSON.stringify(airQuality)}`)
  }
  const { pollution } = airQuality.data.current
  const { ts, aqius, mainus, aqicn, maincn } = pollution

  return {
    result: {
      pollution: {
        ts,
        aqius,
        mainus,
        aqicn,
        maincn
      }
    }
  }
}

async function getParisAirQuality() {
  try {
    const airQuality = await ParisAirQuality.find()
      .sort({ aqius: -1 })
      .limit(1)
      .select({ ts: 1, aqius: 1, _id: 0 })
      .lean()
      .exec()

    if (!airQuality || airQuality.length === 0) {
      logger.error({
        message: 'Error getting Paris air quality'
      })
      Faults.throw('Error getting Paris air quality', 500)
    }

    return {
      result: {
        datetime: airQuality[0].ts,
        aqius: airQuality[0].aqius
      }
    }
  } catch (error) {
    logger.error(error)
    Faults.throw('Error getting Paris air quality', 500)
  }
}

module.exports = {
  getCityAirQuality,
  getParisAirQuality
}