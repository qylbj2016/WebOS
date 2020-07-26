const { Sequelize, BaseModel } = require('./baseDao')

const attrs =  {
    cid: Sequelize.INTEGER(11),
    time: Sequelize.STRING(128),
    parent: Sequelize.INTEGER(11),
    comment: Sequelize.TEXT,
    userHead: Sequelize.STRING(256),
    userName: Sequelize.STRING(128),
    likeList: Sequelize.STRING(256)
}

class CommentModel extends BaseModel {
    constructor(){
        super('Comments', attrs)
        this.model = super.getModel()
        this.model.sync()
    }
} 

module.exports = new CommentModel()