'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User)
      Post.belongsToMany(models.Tag,{through : "PostTag"})
      // define association here
    }
    getFormattedDate() {
      const date = this.createdAt;
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }

    static findByUserId(userId) {
      return this.findAll({
        where: {
          UserId: userId,
        },
      });
    }
  
  }
  Post.init({
    imageUrl: DataTypes.STRING,
    description: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};