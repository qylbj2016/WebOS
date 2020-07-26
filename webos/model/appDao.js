const { Sequelize, BaseModel } = require('./baseDao')

const attrs =  {
    name: Sequelize.STRING(128),
    icon: Sequelize.STRING(256),
    src: Sequelize.STRING(256),
    canAllowMore: Sequelize.INTEGER(11),
    canScale: Sequelize.INTEGER(11),
    type: Sequelize.STRING(64),
    appId: Sequelize.STRING(36),
    width: Sequelize.STRING(64),
    height: Sequelize.STRING(64)
}

class AppModel extends BaseModel {
    constructor(){
        super('Apps', attrs)
        this.model = super.getModel()
        this.model.sync()
    }
} 

module.exports = new AppModel()