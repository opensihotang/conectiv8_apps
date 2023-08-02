const Controller = require("../controllers/controller");
const router = require("express").Router()


router.use(function(req, res, next){
    console.log(req.session);
    // console.log("Time", Date.now(), 'hahahahahpost');
    if(!req.session.userId){
        const error = "Please Login First"
        res.redirect(`/users/login?error=${error}`)
    }
    next();
})
router.get('/', Controller.test)
router.post('/', Controller.test)

module.exports = router