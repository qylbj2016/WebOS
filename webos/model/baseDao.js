const Sequelize = require('sequelize')
const config = require('../config/db')

const { database, user, password, host, dialect } = config
const sequelize = new Sequelize(database, user, password, {
    host,
    dialect,
    query: {
        raw: true
    }
})

class BaseModel {
    constructor(name, attributes ){
        this.model = sequelize.define(name, attributes, { 
            freezeTableName: false,
            timestamps: false
        })
    }
    getModel(){
        return this.model
    } 
    // 查询方法封装 所有查询，条件查询, 限制数目查询
    findAll ( attributes ) {
        return attributes ?  this.model.findAll( { attributes } ) : this.model.findAll()
    }
    findByFilter (attributes, where) {
        return attributes ? this.model.findAll( { attributes , where } ) : this.model.findAll( { where } )
    }
    findByFilterLimited ( ) {
        
    }
    // 更新方法封装
    update (attributes, where) { 
        return where ? this.model.update( attributes, { where }) : this.model.update( attributes )
    }
    // 条件删除
    delete (where) {
        return this.model.destroy( { where } )
    }
    // 插入方法封装  单个插入/多个插入
    create (entity) {
        return this.model.create( entity )
    }
    creates (entities) {
        return this.model.bulkCreate( entities )
    }
}

module.exports = {
    Sequelize,
    BaseModel
}