const nodemailer = require('nodemailer')
const userDao = require('../model/userDao')
const config = require('../config/mail')
const random = require('../utils/random')
const redis = require('../cache/index')
const jsonwebtoken = require('jsonwebtoken')
const { objToMap } = require('../utils/conversion')
const presetService = require('./presetService')
const presetDao = require('../model/presetDao')


//  *  //
const checkToken = token => jsonwebtoken.verify(token, "Cinco2016", (err, data) => {
    if (err) {
        return false
    } else {
        return data
    }
})

// 验证用户是否存在
const checkUserIsExisted = async mail => {
    let res = await userDao.findByFilter(['status'], { mail })
    res = JSON.parse(JSON.stringify(res))[0]
    if (res) {
        if (res.status === 0) {
            return { isExisted: 'pending' }
        } else {
            return { isExisted: true }
        }
    } else {
        return { isExisted: false }
    }
}

// 验证用户名是否已经被注册
const checkNameIsRepeated = async name => {
    let res = await userDao.findByFilter(['status'], { name })
    res = JSON.parse(JSON.stringify(res))[0]
    return res && res.state === 1 ? { isRepeated: true } : { isRepeated: false }
}

// 写入用户信息
const createUserInfo = async info => await userDao.create(info)

// 发送验证邮件
const sendEmail = data => {
    const transporter = nodemailer.createTransport(config)
    const mail = {
        // 发件人
        from: 'Cinco<qylbj2016@163.com>',
        // 主题
        subject: 'WebOS小站的验证邮件',
        // 收件人
        ...data   // to  and  text
    }
    return transporter.sendMail(mail)
}

// 注册
const register = async ctx => {
    const query = ctx.request.body
    const { mail } = query
    const res = await checkUserIsExisted(mail)
    if (res.isExisted === 'pending') {
        return {
            code: 201,
            msg: '验证邮件早已发送，请您及时查收'
        }
    } else {
        const code = random(6),
            uid = random(6)
        const info = {
            ...query,
            uid,
            status: 0  // 0是尚未验证邮箱，但是已经发送邮件，用户数据存入数据库
        }
        const data = {
            to: mail,
            text: `尊敬的用户，您好！点击链接即可验证您在WebOS体验小站的
            个人用户邮箱,http://localhost:3000/checkCode?code=${code}&uid=${uid}` //接收激活请求的链接
        }
        let res1 = await redis.writeIntoRedis(uid, code)
        let res2 = await createUserInfo(info)
        let res3 = await presetService.createPreData(uid)
        if (res1 && res2 && res3) {
            sendEmail(data)
            return {
                code: 200,
                msg: "验证邮件已发送到您的邮箱，请及时查收验证(可能在垃圾箱里)"
            }
        } else {
            return {
                code: 401,
                msg: "注册新用户失败，请联系管理员"
            }
        }
    }
}

const checkCode = async (c, uid) => {
    const code = await redis.getFromRedis(uid)
    if (code === c) {
        await userDao.update({ status: 1 }, { uid })
        return {
            code: 200,
            msg: "邮箱验证成功"
        }
    } else {
        return {
            code: 400,
            msg: "邮箱验证失败"
        }
    }
}

// 登录
const login = async (m, p) => {
    let userInfo = JSON.parse(JSON.stringify(await userDao.findByFilter(null, { mail: m })))[0]
    if (userInfo && p === userInfo.pwd) {
        let preData = JSON.parse(JSON.stringify(await presetDao.findByFilter(null, { uid: userInfo.uid })))[0]
        let cacheMap = objToMap({ ...userInfo, ...preData }),
            sid = random(8)
        await redis.writeIntoRedis(sid, cacheMap, 1000 * 60 * 120)
        return {
            code: 200,
            msg: '登录成功',
            token: jsonwebtoken.sign(
                { uid: userInfo.uid, sid },
                "Cinco2016",
                { expiresIn: '2h' }
            )
        }
    } else {
        return {
            code: 400,
            msg: '用户名与密码不匹配'
        }
    }
}

const getUserInfo = async ids => {
    let res = await redis.getFromRedis(ids.sid, ["name", "head"])
    return {
        name: res[0],
        head: res[1]
    }
}

const sendCode = async mail => {
    let res1 = JSON.parse(JSON.stringify(await userDao.findByFilter(['uid'], { mail })))[0],
        code = random(6)
    const data = {
        to: mail,
        text: `尊敬的用户，您好！您的验证码为${code}，有效期15分钟。`
    }
    let res2 = await redis.writeIntoRedis(mail, code, 1000 * 60 * 15)
    if (res1 && res2) {
        sendEmail(data)
        return {
            code: 200,
            msg: "验证邮件已发出，请您及时查收"
        }
    } else if (!res1) {
        return {
            code: 400,
            msg: "您的邮箱未注册，请先进行注册"
        }
    } else {
        return {
            code: 500,
            msg: "系统错误，请联系管理员"
        }
    }
}
const forget = async (pwd, code, mail) => {
    let c = await redis.getFromRedis(mail)
    if (c === code) {
        let res = JSON.parse(JSON.stringify(await userDao.update({ pwd }, { mail })))[0]
        return res ? { code: 200, msg: "修改密码成功" } : { code: 500, msg: "系统错误，请联系管理员" }
    } else {
        return { code: 400, msg: "验证码不正确，修改失败" }
    }
}

module.exports = {
    login,
    register,
    checkCode,
    checkNameIsRepeated,
    checkUserIsExisted,
    checkToken,
    getUserInfo,
    sendCode,
    forget,
    sendEmail
}