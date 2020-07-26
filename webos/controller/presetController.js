const presetService = require("../service/presetService")
const userService = require('../service/userService')
const pathMap = new Map()

//更改预设
const updatePreData = async ctx => {
    const ids = await userService.checkToken( ctx.cookies.get("WebOS_Token") )
    const res = await presetService.updatePreData(ctx.request.body, ids)
    ctx.body = res
}

//更新商店和桌面的app
const updateApps = async ctx => {
    const ids = await userService.checkToken( ctx.cookies.get("WebOS_Token") )
    const res = await presetService.updateApps( ctx.request.body, ids )
    ctx.body = res
}

pathMap.set('/updateApps', updateApps)
pathMap.set('/updatePreData', updatePreData)

module.exports.path = pathMap