'use strict';
const {
  Model
} = require('sequelize');
const bcryptjs = require("bcryptjs")

const bcrypt = require("bcryptjs")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.UserProfile)
      User.hasMany(models.Post)
      // define association here
    }
  }
  User.init({
    userName: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      validate:{
        len: {
          args:[8, 16],
          msg: "Password Minimum 8 Characters"
        }
      }
    },
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate(user, options) {
        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(user.password, salt)

        user.password = hash
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};