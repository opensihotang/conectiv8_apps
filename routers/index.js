const router = require("express").Router()
const userRoute = require("./userRoute")
const postRoute = require("./postRoutes")
const Controller = require("../controllers/controller")


router.get('/', Controller.renderLandingPage)

router.use('/users', userRoute)
router.use('/posts', postRoute)


module.exports = router