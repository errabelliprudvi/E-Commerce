const express = require('express')
const router = express.Router()

const{
    allUsers,
    userRegistration,
    deleteUser,
    updateUser ,
    getProfile
} = require('../controllers/user')

//router.route('/login').post(getUserDetails)
router.route('/all').get(allUsers)
router.route('/register').post(userRegistration)
router.route('/delete').delete(deleteUser)
router.route('/profile').get(getProfile)
router.route('/update').put(updateUser)

module.exports = router