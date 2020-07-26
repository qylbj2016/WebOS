var fs = require('fs')
var globalConfig = require('../config/server/config')

var pathMap = new Map();

var files = fs.readdirSync(globalConfig['web_path']);

for( var i = 0 ; i < files.length ; i ++){
    var temp = require('../' + globalConfig['web_path'] + files[i])
    if(temp.path){
        for(var [key,value] of temp.path){
            if(pathMap.get(key) === undefined){
                pathMap.set(key, value)
            }else{
                throw new Error('url path 异常')
            }
        }
    }
}
module.exports = pathMap