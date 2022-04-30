const mongoose = require('mongoose')
const memberModel = require("./memberModel")

const statisticsSchema = mongoose.Schema(
  {
    member: {type: Object, required: [true, 'Please add member']},
    expire_at: {type: Date, default: Date.now, expires: 7200} 
  }
)

module.exports = mongoose.model('StatisticsModel', statisticsSchema)
