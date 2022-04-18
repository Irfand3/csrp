const mongoose = require('mongoose')

const memberSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    telephone: {
      type: String,
      required: [true, 'Please add a telephone'],
    },
    address: {
        type: String,
        required: [true, 'Please add a address'],
    },
    memberType: {
        type: String,
        required: [true, 'Please add a member typr'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Member', memberSchema)
