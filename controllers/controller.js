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


    static renderPostHome(req, res){
        User.findAll({
            include : Post
        })
        .then((users) => {
            // console.log(users);
            res.render('postHome', {users})
        })
    }
    static showUsers(req, res){
        User.findAll()
        .then(data=>{
            res.render('listUser', {data})
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static userProfile(req, res){
        // console.log(req.params);
        const {id} = req.params
        User.findByPk(id,{
            include:{
                model: UserProfile
            }
        })
        .then(data=>{
            // console.log(data);
            res.render('userProfile', {user: data})
        })
        .catch(err=>{
            res.send(err)

        })
    }

    static renderAddPost(req, res){
        res.render('formAddPost')
    }

    static handleAddPost(req, res){
        const id = req.session.userId;
        // const {uploadfile} = req.file
        const {description} = req.body
        if (req.file){
           const filename = req.file.filename;
           Post.create({description, imageUrl : '/assets/' + filename, UserId : id})
           .then(data =>{
               res.redirect('/posts')
           })
           .catch(err => {
               res.send(err)
           })
       } else {
        Post.create({description, UserId : id})
           .then(data =>{
               res.redirect('/posts')
           })
           .catch(err => {
               res.send(err)
           })
       }


    }
}

module.exports = Controller