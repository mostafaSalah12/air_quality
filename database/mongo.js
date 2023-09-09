const mongoose = require('mongoose')
const config = require('../utils/config')

async function connectDB(connectionURI = config.MONGODB_URI) {
  try {
    await mongoose.connect(connectionURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: config.MAX_POOL_SIZE,
      wtimeoutMS: 2500
    })

    const connectionPool = mongoose.connection

    connectionPool.on('connected', () => {
      console.log('MongoDB connected!')
    })

    connectionPool.on('error', (err) => {
      console.log('MongoDB connection error:', err)
    })

    connectionPool.on('disconnected', () => {
      console.log('MongoDB disconnected')
    })

    return connectionPool
  } catch (err) {
    console.log(err)
  }
}

module.exports = connectDB
