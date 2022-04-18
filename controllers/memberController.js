const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const MemberModel = require('../models/memberModel')

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const addMember = asyncHandler(async (req, res) => {
    console.log(req.body);
  const { name, email, phone, address, category } = req.body

  if (!name || !email || !phone || !address || !category ) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  const member = await MemberModel.create({
    name,
    email,
    telephone: phone,
    address,
    memberType: category
  })

  if (member) {
    res.status(201).json({
      _id: member.id,
      name: member.name,
      email: member.email,
      telephone: member.telephone,
      address: member.address,
      memberType: member.memberType
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const getMembers = asyncHandler(async (req, res) => {

  // Check for user email
  const members = await MemberModel.find()

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
const deleteMember = asyncHandler(async (req, res) => {
    const member = await MemberModel.findById(req.params.id)
    console.log();

    if (!member) {
      res.status(400)
      throw new Error('Member not found')
    }
  
    // Check for user
    /* if (!req.user) {
      res.status(401)
      throw new Error('User not found')
    } */
  
    await member.remove()
  
    res.status(200).json({ id: req.params.id })
})

const getMemberById = asyncHandler(async (req, res) => {
    const member = await MemberModel.findById(req.params.id)

    if (!member) {
      res.status(400)
      throw new Error('Member not found')
    }
  
    res.status(200).json({ member: member })
})

const updateMemberById = asyncHandler(async (req, res) => {
    const member = await Member.findById(req.params.id)

    if (!member) {
      res.status(400)
      throw new Error('Member not found')
    }

    const updatedMember = await Member.findByIdAndUpdate(req.params.id, req.body)
  
    res.status(200).json({ member: updatedMember })
})

module.exports = {
  addMember,
  getMembers,
  deleteMember,
  getMemberById,
  updateMemberById
}
