const {User, UserProfile, Post, Tag, PostTag } = require("../models")

class Controller{
    static test(req, res){
        res.send("test")
    }

    static renderLandingPage(req, res){
        res.render('home')
    }

    static renderLoginPage(req, res){
        res.render('loginPage')
    }

    static renderRegisterPage(req, res){
        res.render('registerPage')
    }


}

module.exports = Controller