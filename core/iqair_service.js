const axios = require('axios')
const config = require('../utils/config')
const logger = require('../utils/logger')
const Faults = require('../utils/faults')

function createAirQualityRequest(latitude, longitude) {
  const { IQAIR_API_URL, IQAIR_API_KEY } = config
  return {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${IQAIR_API_URL}/nearest_city?lat=${latitude}&lon=${longitude}&key=${IQAIR_API_KEY}`,
    headers: {}
  }
}

async function getAirQualityNearestCity(latitude, longitude) {
  const request = createAirQualityRequest(latitude, longitude)

  try {
    const { status, data = {} } = await axios(request)
    if (status === 200) {
      return data
    }
  } catch (error) {
    logger.error({
      message: 'Error getting air quality',
      data: error
    })
    if (error.response && error.response.status === 400) {
      Faults.throw('Invalid latitude or longitude', 400)
    }
  }
  return {}
}

module.exports = {
  getAirQualityNearestCity
}