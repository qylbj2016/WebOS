const { Sequelize, BaseModel } = require('./baseDao')

const attrs =  {
    mail: Sequelize.STRING(256),
    pwd: Sequelize.STRING(128),
    sex: Sequelize.STRING(36),
    status: Sequelize.INTEGER(11),
    uid: Sequelize.INTEGER(11),
    head: Sequelize.STRING(128),
    name: Sequelize.STRING(128)
}

class UserModel extends BaseModel {
    constructor(){
        super('Users', attrs)
        this.model = super.getModel()
        this.model.sync()
    }
} 

module.exports = new UserModel()