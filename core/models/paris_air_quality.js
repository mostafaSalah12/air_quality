const mongoose = require('mongoose')
const Schema = mongoose.Schema

const parisAirQualitySchema = new Schema({
  city: {
    type: String
  },
  aqius: {
    type: Number
  },
  aqicn: {
    type: Number
  },
  ts: {
    type: String
  }
}, { timestamps: true })

module.exports.ParisAirQuality = mongoose.model('ParisAirQuality', parisAirQualitySchema)
