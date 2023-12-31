const { User, UserProfile, Post, Tag, PostTag } = require("../models")
const bcrypt = require("bcryptjs")
const formatDate = require("../helpers/formatDate")
const formatDateUser = require("../helpers/formatDateUser")
const { Op } = require("sequelize")

class Controller {
    static test(req, res) {
        res.render("postHome")
    }

    static renderLandingPage(req, res) {
        res.render('home')
    }

    static renderRegisterPage(req, res) {
        const { errors } = req.query
        res.render('registerPage', {errors})
    }

    static handleRegister(req, res) {
        const { userName, password, role } = req.body
        // console.log(req.body);

        User.create({ userName, password, role })
            .then((data) => {
                res.redirect('/')
            })
            .catch((err) => {
                if (err.name === 'SequelizeValidationError') {
                    const errors = err.errors.map(el => el.message)
                    res.redirect(`/users/register?errors=${errors}`)
                } else {
                    res.send(err)
                }
            })
    }

    static renderLoginPage(req, res) {
        const { error } = req.query
        res.render('loginPage', { error })
    }

    static handleLogin(req, res) {
        const { userName, password } = req.body
        // console.log(req.body);
        User.findOne({
            where: { userName }
        })
            .then((user) => {
                // console.log(user);
                if (user) {
                    const validPassword = bcrypt.compareSync(password, user.password)
                    if (validPassword) {
                        req.session.userId = user.id //set session di controller setelah login
                        req.session.role = user.role
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

    static handleLogOut(req, res) {
        req.session.destroy((err) => {
            if (err) {
                res.send("Logout Failed", err);
            } else {
                res.redirect('/users/login')
            }
        })
    }

    static renderPostHome(req, res) {
        const { error } = req.query
        const { search } = req.query
        if (search) {
            User.findAll({
                where: {
                    userName: {
                        [Op.iLike]: `%${search}%`
                    }
                },
                include: Post,
                order: [
                    ["createdAt", "desc"]
                ]
            })
                .then((users) => {
                    // console.log(users);
                    res.render('postHome', { users, formatDate, error })
                })
                .catch((err) => {
                    res.send(err)
                })
        } else {
            User.findAll({
                include: Post,
                order: [
                    ["createdAt", "desc"]
                ]
            })
                .then((users) => {
                    // console.log(users);
                    res.render('postHome', { users, formatDate, error })
                })
                .catch((err) => {
                    res.send(err)
                })
        }
    }
// <<<<<<< HEAD

//     static showUsers(req, res){
// =======
//     static showUsers(req, res) {
// >>>>>>> 837cb6103c6885611519d03d0ca2ffe9f40dd83a
//         User.findAll()
//             .then(data => {
//                 res.render('listUser', { data })
//             })
//             .catch(err => {
//                 res.send(err)
//             })
//             .then((users) => {
//                 // console.log(users);
//                 res.render('postHome', { users })
//             })
//     }

    static showUsers(req, res) {
        const { sort } = req.query
        // console.log(req.query);
        if (sort) {
            User.findAll({
                order: [
                    [`${sort}`]
                ]
            })
                .then(data => {
                    // console.log(data);
                    res.render('listUser', { data, formatDateUser })
                })
                .catch(err => {
                    res.send(err)
                })
        } else {
            User.findAll()
                .then(data => {
                    // console.log(data);
                    res.render('listUser', { data, formatDateUser })
                })
                .catch(err => {
                    res.send(err)
                })
        }
    }

    static profile(req, res) {
        const { userId } = req.session
        console.log(userId);
        UserProfile.findByUserId(userId)
            .then(profile => {
                if (profile) {
                    res.render('profile', { profile })
                } else {
                    res.render('addProfile') // Render 'addProfile' jika profil tidak ditemukan
                }
            })
            .catch(err => {
                res.send(err)
            })
    }

    static updateProfile(req, res) {
        // console.log(req.body);
        const { userId } = req.session
        // UserProfile.update()
        const { firstName, lastName, email, gender, birthDate, bio } = req.body
        UserProfile.update({ firstName, lastName, email, gender, birthDate, bio }, {
            where: {
                UserId: userId
            }
        })
            .then(() => {
                res.redirect('/users/profile')
            })
            .catch(err => {
                res.send(err)
            })
    }

    static addProfile(req, res) {
        res.render('addProfile')
    }

    static insertProfile(req, res) {
        // console.log(req.body);
        const userId = req.session.userId
        const { firstName, lastName, email, gender, birthDate, bio } = req.body
        UserProfile.create({ firstName, lastName, email, gender, birthDate, UserId: userId, bio })
            .then(() => {
                res.redirect('/users/profile')
            })
            .catch(err => {
                res.send(err)
            })
    }

    // static userProfile(req, res) {
    //     // console.log(req.params);
    //     const { id } = req.params
    //     User.findByPk(id, {
    //         include: {
    //             model: UserProfile
    //         }
    //     })
    //         .then(data => {
    //             // console.log(data);
    //             res.render('userProfile', { user: data })
    //         })
    //         .catch(err => {
    //             res.send(err)

    //         })
    // }

    static deleteUser(req, res) {
        const { id } = req.params;

        Post.destroy({
            where: {
                UserId: id,
            },
        })
            .then(() => {
                return UserProfile.destroy({
                    where: {
                        UserId: id,
                    },
                });
            })
            .then(() => {
                return User.destroy({
                    where: {
                        id: id,
                    },
                });
            })
            .then(() => {
                res.redirect('/users/listUser');
            })
            .catch((err) => {
                res.send(err);
            });
    }

    static renderAddPost(req, res) {
        Tag.findAll()
        .then(tags=>{
            console.log(tags);
            res.render('formAddPost', {tags})
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static handleAddPost(req, res) {
        const id = req.session.userId;
        const { description, tag } = req.body
        if (req.file) {
            const filename = req.file.filename;
            Post.create({ description, imageUrl: '/assets/' + filename, UserId: id })
              .then(post => {
                console.log(post);
                if (tag) {
                  Tag.create({ name : tag}).then(() => {
                    res.redirect('/posts');
                  });
                } else {
                  res.redirect('/posts');
                }
              })
              .catch(err => {
                res.send(err);
              });
          } else {
            Post.create({ description, UserId: id })
              .then(post => {
                // console.log(post);
                if (tag) {
                  Tag.create({ tag}).then(() => {
                    res.redirect('/posts');
                  });
                } else {
                  res.redirect('/posts');
                }
              })
              .catch(err => {
                res.send(err);
              });
          }
    }
}

module.exports = Controller