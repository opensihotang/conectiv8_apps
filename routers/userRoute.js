const Controller = require("../controllers/controller");
const router = require("express").Router()

const roleSession = (function(req, res, next){
    // console.log(req.session.role);
    // console.log("Time", Date.now(), 'hahahahahpost');
    if(req.session.userId && req.session.role !== "admin"){
        const error = "Acces denied, you have no access"
        res.redirect(`/posts?error=${error}`)
    }
    next();
})

router.get('/register', Controller.renderRegisterPage)
router.post('/register', Controller.handleRegister)

router.get('/login', Controller.renderLoginPage)
router.post('/login', Controller.handleLogin)

router.get('/logout', Controller.handleLogOut)

// router.get('/', Controller.test)

router.get('/profile', Controller.profile)
router.post('/profile', Controller.updateProfile)

router.get('/listUser', roleSession, Controller.showUsers)

router.get('/addProfile', Controller.addProfile)
router.post('/addProfile', Controller.insertProfile)

// router.get('/userProfile/:id', Controller.userProfile)
router.get('/listUser/delete/:id', Controller.deleteUser);


module.exports = router