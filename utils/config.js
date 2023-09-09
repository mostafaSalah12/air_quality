const dotenv = require('dotenv')
dotenv.config()

const {
  PORT = 3000,
  NODE_ENV = 'development',
  IQAIR_API_KEY,
  IQAIR_API_URL,
  MONGODB_URI,
  MAX_POOL_SIZE = 10,
  LOG_LEVEL = 'info',
  LOG_PRETTY_PRINT = false
} = process.env

module.exports = {
  PORT,
  NODE_ENV,
  IQAIR_API_KEY,
  IQAIR_API_URL,
  MONGODB_URI,
  MAX_POOL_SIZE,
  LOG_LEVEL,
  LOG_PRETTY_PRINT
}