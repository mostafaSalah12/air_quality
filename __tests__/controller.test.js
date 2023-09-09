const AirQualityController = require('../core/controller')
const IQairService = require('../core/iqair_service')
const { ParisAirQuality } = require('../core/models/paris_air_quality')

jest.mock('../core/iqair_service')
jest.mock('../core/models/paris_air_quality', () => ({
  ParisAirQuality: {
    find: jest.fn()
      .mockReturnThis()
  }
}))

describe('AirQualityController', () => {
  describe('getCityAirQuality', () => {
    it('should return air quality for the nearest city', async() => {
      const latitude = 48.856613
      const longitude = 2.352222
      const airQualityData = {
        status: 'success',
        data: {
          current: {
            pollution: {
              ts: '2021-01-05T15:00:00.000Z',
              aqius: 50,
              mainus: 'p2',
              aqicn: 16,
              maincn: 'p2'
            }
          }
        }
      }
      IQairService.getAirQualityNearestCity.mockResolvedValueOnce(airQualityData)

      const expectedResponse = {
        result: {
          pollution: {
            ts: '2021-01-05T15:00:00.000Z',
            aqius: 50,
            mainus: 'p2',
            aqicn: 16,
            maincn: 'p2'
          }
        }
      }

      const response = await AirQualityController.getCityAirQuality(latitude, longitude)

      expect(IQairService.getAirQualityNearestCity)
        .toHaveBeenCalledWith(latitude, longitude)
      expect(response)
        .toEqual(expectedResponse)
    })

    it('should throw an InternalServerError if the air quality data cannot be retrieved', async() => {
      const latitude = 48.856613
      const longitude = 2.352222
      const errorMessage = 'Failed to get air quality data'
      IQairService.getAirQualityNearestCity.mockRejectedValueOnce(new Error(errorMessage))

      await expect(AirQualityController.getCityAirQuality(latitude, longitude)).rejects.toThrow(
        'Failed to get air quality data'
      )
    })
  })

  describe('getParisAirQuality', () => {
    it('should return the latest air quality data for Paris', async() => {
      const airQualityData = {
        ts: '2021-01-05T15:00:00.000Z',
        aqius: 50
      }
      ParisAirQuality.find.mockReturnValueOnce({
        sort: jest.fn()
          .mockReturnThis(),
        limit: jest.fn()
          .mockReturnThis(),
        select: jest.fn()
          .mockReturnThis(),
        lean: jest.fn()
          .mockReturnThis(),
        exec: jest.fn()
          .mockResolvedValueOnce([airQualityData])
      })

      const expectedResponse = {
        result: {
          datetime: '2021-01-05T15:00:00.000Z',
          aqius: 50
        }
      }

      const response = await AirQualityController.getParisAirQuality()

      expect(ParisAirQuality.find)
        .toHaveBeenCalled()
      expect(response)
        .toEqual(expectedResponse)
    })

    it('should throw an InternalServerError if the air quality data cannot be retrieved', async() => {
      const errorMessage = 'Failed to get air quality data'
      ParisAirQuality.find.mockReturnValueOnce({
        sort: jest.fn()
          .mockReturnThis(),
        limit: jest.fn()
          .mockReturnThis(),
        select: jest.fn()
          .mockReturnThis(),
        lean: jest.fn()
          .mockReturnThis(),
        exec: jest.fn()
          .mockRejectedValueOnce(new Error(errorMessage))
      })

      await expect(AirQualityController.getParisAirQuality()).rejects.toThrow('Error getting Paris air quality')
    })

    it('should throw error if the air quality data for Paris cannot be found', async() => {
      ParisAirQuality.find.mockReturnValueOnce({
        sort: jest.fn()
          .mockReturnThis(),
        limit: jest.fn()
          .mockReturnThis(),
        select: jest.fn()
          .mockReturnThis(),
        lean: jest.fn()
          .mockReturnThis(),
        exec: jest.fn()
          .mockResolvedValueOnce([])
      })

      await expect(AirQualityController.getParisAirQuality()).rejects.toThrow('Error getting Paris air quality')
    })
  })
})