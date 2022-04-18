const express = require('express')
const router = express.Router()
const {
    getMemberTypes,
    addMemberType,
    deleteMemberType,
    getMemberTypeById,
    updateMemberType
} = require('../controllers/memberTypeController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(/* protect, */ getMemberTypes)
router.route('/add').post(/* protect, */ addMemberType)
router.route('/:id').delete(/* protect, */ deleteMemberType)
router.route('/:id').get(/* protect, */ getMemberTypeById)
router.route('/editMemberType/:id').put(/* protect, */ updateMemberType)

module.exports = router
