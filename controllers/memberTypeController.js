const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const MemberType = require('../models/memberTypeModel')

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const addMemberType = asyncHandler(async (req, res) => {
  const { name, description, price } = req.body

  if (!name || !description || !price) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  const memberType = await MemberType.create({
    typeName: name,
    typeDescription: description,
    pay: price,
  })

  if (memberType) {
    res.status(201).json({
      _id: memberType.id,
      typeName: memberType.typeName,
      typeDescription: memberType.typeDescription,
      pay: memberType.pay
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const getMemberTypes = asyncHandler(async (req, res) => {

  // Check for user email
  const members = await MemberType.find()

  if (members) {
    res.status(200).json({
      members
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const deleteMemberType = asyncHandler(async (req, res) => {
    const member = await MemberType.findById(req.params.id)

    if (!member) {
      res.status(400)
      throw new Error('Member not found')
    }
  
    await member.remove()
  
    res.status(200).json({ id: req.params.id })
})

const getMemberTypeById = asyncHandler(async (req, res) => {
    const member = await MemberType.findById(req.params.id)

    if (!member) {
      res.status(400)
      throw new Error('Member not found')
    }
  
    res.status(200).json({ memberType: member })
})

const updateMemberType = asyncHandler(async (req, res) => {
    const memberType = await MemberType.findById(req.params.id)

    if (!memberType) {
      res.status(400)
      throw new Error('Member Type not found')
    }

    const updatedMemberType = await MemberType.findByIdAndUpdate(req.params.id, req.body)
      console.log(updatedMemberType);
  
    res.status(200).json({ memberType: updatedMemberType })
})


module.exports = {
  addMemberType,
  getMemberTypes,
  deleteMemberType,
  getMemberTypeById,
  updateMemberType
}
