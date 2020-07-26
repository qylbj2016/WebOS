const appDao = require('../model/appDao')
const redis = require("../cache")

const initApps = async ids => {
    let res = await appDao.findAll(),
        preStr = Array.from(await redis.getFromRedis(ids.sid, "preApps"))[0]
    sApps = JSON.parse(JSON.stringify(res)),
        preApps = []
    if (preStr) {
        preStr.split("+").forEach((item) => {
            let len = sApps.length
            for (let i = 0; i < len; i++) {
                if (sApps[i].appId === item) {
                    preApps.push(sApps.splice(i, 1)[0])
                    break
                }
            }
        })
    }
    return {
        sApps,
        preApps
    }
}

module.exports = {
    initApps
}
