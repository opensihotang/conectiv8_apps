const Controller = require("../controllers/controller");
const router = require("express").Router()
const multer = require("multer")
// const upload = multer({ dest: './assets' })
const upload = require("../multer/multer")


router.use(function(req, res, next){
    // console.log(req.session.role);
    // console.log("Time", Date.now(), 'hahahahahpost');
    if(!req.session.userId){
        const error = "Please Login First"
        res.redirect(`/users/login?error=${error}`)
    }
    next();
})
router.get('/', Controller.renderPostHome)

router.get('/add', Controller.renderAddPost)
router.post('/add', upload.single("uploadfile"), Controller.handleAddPost)

// router.post('/', Controller.test)

module.exports = router