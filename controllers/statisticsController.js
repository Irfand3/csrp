const asyncHandler = require('express-async-handler')
const StatisticsModel = require('../models/statisticsModel')

// @access  Public
const addMemberToGym = asyncHandler(async (req, res) => {

  const memberAddedToGym = await StatisticsModel.create({
      member: req.body
  })

  if (memberAddedToGym) {
    res.status(201).json({
        memberAddedToGym
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

const getMembersInGym = asyncHandler(async (req, res) => {

    // Check for user email
    const membersInGym = await StatisticsModel.find()
  
    if (membersInGym) {
      res.status(200).json({
        membersInGym
      })
    } else {
      res.status(400)
      throw new Error('Invalid credentials')
    }
  })

module.exports = {
    addMemberToGym,
    getMembersInGym
}
