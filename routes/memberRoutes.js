const express = require('express')
const router = express.Router()
const {
    addMember,
    getMembers,
    deleteMember,
    getMemberById,
    updateMemberById
} = require('../controllers/memberController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(/* protect, */ getMembers)
router.route('/add').post(/* protect,  */addMember)
router.route('/:id').delete(/* protect, */ deleteMember)
router.route('/:id').get(/* protect, */ getMemberById)
router.route('/editMember/:id').put(/* protect, */ updateMemberById)

module.exports = router
