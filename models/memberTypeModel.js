const mongoose = require('mongoose')

const memberTypeSchema = mongoose.Schema(
  {
    typeName: {
      type: String,
      required: [true, 'Please add a type name'],
    },
    typeDescription: {
      type: String,
      required: [true, 'Please add a type description'],
      unique: true,
    },
    pay: {
      type: Number,
      required: [true, 'Please add a pay'],
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('MemberType', memberTypeSchema)
