const Controller = require("../controllers/controller");
const router = require("express").Router()


router.get('/register', Controller.renderRegisterPage)
router.post('/register', Controller.handleRegister)

router.get('/login', Controller.renderLoginPage)
router.post('/login', Controller.handleLogin)

router.get('/logout', Controller.handleLogOut)

router.get('/', Controller.test)

router.get('/listUser', Controller.showUsers)

router.get('/userProfile/:id', Controller.userProfile)

module.exports = router