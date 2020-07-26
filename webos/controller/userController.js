const userService = require('../service/userService')
const pathMap = new Map()

// 验证用户是否存在
const checkUserIsExisted = async ctx => {
    const mail = ctx.request.query.mail
    const res = await userService.checkUserIsExisted(mail)
    ctx.body = res
}

// 验证用户名是否已经被注册
const checkNameIsRepeated = async ctx => {
    const name = ctx.request.query.name
    const res = await userService.checkNameIsRepeated(name)
    ctx.body = res
}

// 注册
const register = async ctx => {
    const res = await userService.register(ctx)
    ctx.body = res
}
// 邮箱验证
const checkCode = async ctx => {
    const { code, uid } =  ctx.request.query
    const res = await userService.checkCode(code, uid)
    await ctx.render('./check', { data: {
        title: "WebOS",
        code: res.code,
        msg: res.msg
    }})
}

// 登录
const login = async ctx => {
    const { mail, pwd } = ctx.request.body
    const res = await userService.login(mail, pwd)
    if(res.code === 200){
        await ctx.cookies.set(
            'WebOS_Token', res.token,{
                maxAge: 1000 * 60 * 30,
                httpOnly: true
            }
        )
        delete res.token
    }
    ctx.body = res
}
// 发送申诉验证码
const sendCode = async ctx => {
    const { mail } = ctx.request.query
    ctx.body = await userService.sendCode(mail)
}

// 修改密码
const forget = async ctx => {
    const { pwd, code, mail } = ctx.request.body
    ctx.body = await userService.forget( pwd, code, mail )
}

pathMap.set('/login', login)
pathMap.set('/register', register)
pathMap.set('/checkCode', checkCode)
pathMap.set('/checkNameIsRepeated', checkNameIsRepeated),
pathMap.set('/checkUserIsExisted', checkUserIsExisted)
pathMap.set('/sendCode', sendCode),
pathMap.set('/forget', forget)

module.exports.path = pathMap