const {User, UserProfile, Post, Tag, PostTag } = require("../models")
const bcrypt = require("bcryptjs")

class Controller{
    static test(req, res){
        res.render("postHome")
    }

    static renderLandingPage(req, res){
        res.render('home')
    }
    
    static renderRegisterPage(req, res){
        res.render('registerPage')
    }

    static handleRegister(req, res){
        const {userName, password, role} = req.body
        // console.log(req.body);
        User.create({userName, password, role})
        .then((data) => {
            res.redirect('/')
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static renderLoginPage(req, res){
        const {error} = req.query
        res.render('loginPage', {error})
    }

    static handleLogin(req, res){
        const{userName, password} = req.body
        // console.log(req.body);
        User.findOne({
            where : {userName}
        })
        .then((user) => {
            // console.log(user);
            if(user){
                const validPassword = bcrypt.compareSync(password, user.password)
                if (validPassword){
                    req.session.userId = user.id //set session di controller setelah login
                    // console.log(req.session.id, "ini user.id");
                    return res.redirect('/posts')
                } else {
                    const error = "Invalid username/password"
                    res.redirect(`/users/login?error=${error}`)
                }
            } else {
                const error = "Invalid username/password"
                res.redirect(`/users/login?error=${error}`)
            }
        })
        .catch((err) => {
            res.send(err)
        })
    }

    static handleLogOut(req, res){
        req.session.destroy((err) => {
            if(err){
                res.send ("Logout Failed", err);
            } else {
                res.redirect('/users/login')
            }
        })
    }



}

module.exports = Controller