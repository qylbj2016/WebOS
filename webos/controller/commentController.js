const commentService = require("../service/commentService")
const userService = require("../service/userService")
const pathMap = new Map()

// 获取评论
const getComments = async ctx => {
    const res = await commentService.getComments()
    ctx.body = res
}

// 写评论
const writeComment = async ctx => {
    const data = ctx.request.body
    const res = await commentService.writeComment(data)
    data.contact ? commentService.contact(data.name, data.time) : ""
    ctx.body = res
}

// 点赞
const thumbUp = async ctx => {
    const { cid, opt } = ctx.request.query
    const ids = await userService.checkToken( ctx.cookies.get("WebOS_Token") )
    const res = await commentService.thumbUp( cid, opt, ids )
    ctx.body = res
}


pathMap.set("/getComments", getComments)
pathMap.set("/writeComment", writeComment)
pathMap.set("/thumbUp", thumbUp)

module.exports.path = pathMap