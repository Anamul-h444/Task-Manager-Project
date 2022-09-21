const router = require('express').Router();
const {TokenVerify} = require('../middleware/AuthVerifyMiddleware')
const ProfileController = require('../controller/ProfileController')
const TaskController = require('../controller/TaskController')
const OTPController = require('../controller/OTPController')



// User api
router.post('/regestrationUser',ProfileController.regestrationUser )
router.post('/loginUser',ProfileController.loginUser )
router.get('/selectProfile', TokenVerify, ProfileController.selectProfile )
router.post('/updateProfile', TokenVerify, ProfileController.updateProfile )
router.get('/profileDetails', TokenVerify, ProfileController.profileDetails )

// OTP
router.get('/emailVarificationAndSendOTP/:email', OTPController.emailVarificationAndSendOTP )
router.get('/RecoverVerifyOTP/:email/:otp', OTPController.RecoverVerifyOTP )
router.post('/RecoverResetPass', OTPController.RecoverResetPass )

//Task api
router.post('/createTask',TokenVerify, TaskController.createTask )
router.get('/deleteTask/:id',TokenVerify, TaskController.deleteTask )
router.get('/updateStatus/:id/:status',TokenVerify, TaskController.updateStatus )
router.get('/listTaskByStatus/:status',TokenVerify, TaskController.listTaskByStatus )
router.get('/countStatus',TokenVerify, TaskController.countStatus )

module.exports = router;
