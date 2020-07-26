const presetDao = require("../model/presetDao")
const redis = require("../cache")
const { objToArr } = require("../utils/conversion")

const createPreData = async uid => {
    const predata = {
        uid,
        bgIdx: 0,
        preApps: "001+002+003+021+022",
        light: 100,
        sleeptime: 300,
        fontColor: "#000",
        borderColor: "#999",
        scale: 1,
        snpwd: "",
        isSnpwd: 0,
        haveTips: 0,
    }
    return await presetDao.create( predata )
}

const getPreData = async ids => {
    let res = await redis.getFromRedis(ids.sid, ["bgIdx", "light", "sleeptime", "snpwd", "fontColor", "borderColor", "scale", "isSnpwd", "haveTips"])
    return {
        bgIdx: res[0],
        light: Number.parseInt( res[1] ),
        sleeptime: Number.parseInt( res[2] ),
        snpwd: res[3],
        fontColor: res[4],
        borderColor: res[5],
        scale: Number.parseInt( res[6] ),
        isSnpwd: res[7],
        haveTips: ~~ res[8] === 0 ? 1 : 0
    }
}

const updatePreData = async ( data, ids ) => {
    let res1 = await redis.updateRedis(ids.sid, objToArr( data )),
        res2 = await presetDao.update( data, { uid: ids.uid })
    return res1 && res2
}

const updateApps = async (data, ids) => {
    let preStr = data.preApps.reduce((pre, item) => `${pre}+${item.appId}`, ""),
        res1 = await redis.updateRedis(ids.sid, ['preApps', preStr]),
        res2 = await presetDao.update({ preApps: preStr, }, { uid: ids.uid })
    return res1 && res2
}

module.exports = {
    createPreData,
    getPreData,
    updatePreData,
    updateApps
}
