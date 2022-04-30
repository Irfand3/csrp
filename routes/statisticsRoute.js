const express = require('express')
const router = express.Router()
const {
    addMemberToGym,
    getMembersInGym
} = require('../controllers/statisticsController.js')

const { protect } = require('../middleware/authMiddleware')

router.route('/').post(protect, addMemberToGym)
router.route('/').get( protect, getMembersInGym)
module.exports = router