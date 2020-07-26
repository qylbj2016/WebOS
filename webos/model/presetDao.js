const { Sequelize, BaseModel } = require('./baseDao')

const attrs =  {
    uid: Sequelize.INTEGER(11),
    preApps: Sequelize.STRING(256),
    bgIdx: Sequelize.INTEGER(11),
    light: Sequelize.INTEGER(11),
    sleeptime: Sequelize.INTEGER(11),
    snpwd: Sequelize.STRING(128),
    fontColor: Sequelize.STRING(64),
    borderColor: Sequelize.STRING(64),
    scale: Sequelize.INTEGER(11),
    isSnpwd: Sequelize.INTEGER(11),
    haveTips: Sequelize.INTEGER(11)
}

class PresetModel extends BaseModel {
    constructor(){
        super('Presets', attrs)
        this.model = super.getModel()
        this.model.sync()
    }
} 

module.exports = new PresetModel()