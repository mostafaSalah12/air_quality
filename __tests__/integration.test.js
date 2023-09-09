const buildFastify = require('../server')
const request = require('supertest')
const connectDB = require('../database/mongo')

jest.setTimeout(100000000)
describe('AirQuality Endpoints', () => {
  let fastify

  beforeAll(async() => {
    fastify = await buildFastify()
    await fastify.ready()
  })

  afterAll(() => {
    fastify.close()
  })

  describe('GET /pollution/nearest_city', () => {
    it('should return 200 OK when lat and lon are provided and valid', async() => {
      const response = await request(fastify.server)
        .get('/api/pollution/nearest_city?lat=40.730610&lon=-73.935242')
      expect(response.statusCode)
        .toBe(200)

      expect(response.body)
        .toHaveProperty('result')

      expect(response.body.result)
        .toHaveProperty('pollution')
    })

    it('should return 400 Bad Request when lon is not provided', async() => {
      const response = await request(fastify.server)
        .get('/api/pollution/nearest_city?lat=40.730610')
      expect(response.statusCode)
        .toBe(400)
    })

    it('should return 400 Bad Request when lat is not provided', async() => {
      const response = await request(fastify.server)
        .get('/api/pollution/nearest_city?lon=-73.935242')
      expect(response.statusCode)
        .toBe(400)
    })

    it('should return 400 Bad Request when lat is not a number', async() => {
      const response = await request(fastify.server)
        .get('/api/pollution/nearest_city?lat=abc&lon=-73.935242')
      expect(response.statusCode)
        .toBe(400)
    })

    it('should return 400 Bad Request when lon is not a number', async() => {
      const response = await request(fastify.server)
        .get('/api/pollution/nearest_city?lat=40.730610&lon=abc')
      expect(response.statusCode)
        .toBe(400)
    })

    it('should return 400 Bad Request when lat is out of range', async() => {
      const response = await request(fastify.server)
        .get('/api/pollution/nearest_city?lat=100&lon=-73.935242')
      expect(response.statusCode)
        .toBe(400)
    })

    it('should return 400 Bad Request when lon is out of range', async() => {
      const response = await request(fastify.server)
        .get('/api/pollution/nearest_city?lat=40.730610&lon=200')
      expect(response.statusCode)
        .toBe(400)
    })
  })

  describe('GET /pollution/paris', () => {
    let dbConnection

    beforeAll(async() => {
      dbConnection = await connectDB()
    })

    afterAll(async() => {
      await dbConnection.close()
    })
    it('should return 200 OK', async() => {
      const response = await request(fastify.server)
        .get('/api/pollution/paris')
      console.log(response.body)
      expect(response.statusCode)
        .toBe(200)

      expect(response.body)
        .toHaveProperty('result')

      expect(response.body.result)
        .toHaveProperty('datetime')

      expect(response.body.result.datetime)
        .toBeDefined()
    })
  })
})
