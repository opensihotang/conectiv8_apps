const Controller = require("../controllers/controller");
const router = require("express").Router()


router.get('/login', Controller.renderLoginPage)
router.get('/register', Controller.renderRegisterPage)
router.get('/', Controller.test)


module.exports = router