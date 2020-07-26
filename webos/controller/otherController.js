const userService = require('../service/userService')
const presetService = require('../service/presetService')
const appService = require('../service/appService')
const upload = require('../config/upload')
const pathMap = new Map()

// 获得图片上传凭证
const upToken = async ctx => ctx.body = upload.uploadToken

// 初始化信息
const initData = async ctx => {
    const ids = await userService.checkToken(ctx.cookies.get("WebOS_Token"))
    if (ids) {
        const userInfo = await userService.getUserInfo(ids),
            preApps = await appService.initApps(ids),
            preData = await presetService.getPreData(ids)
        ctx.body = {
            userInfo,
            preApps,
            preData
        }
    }else{
        ctx.body = {
            code: 400,
            msg: "请您先登录再访问该页"
        }
    }
}

pathMap.set('/initData', initData)
pathMap.set('/upToken', upToken)

module.exports.path = pathMap