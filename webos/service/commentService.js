const commentDao = require("../model/commentDao")
const userService = require("../service/userService")
const redis = require("../cache/index")

const getComments = async () => await commentDao.findAll()

const writeComment = async data => {
    let curtime = new Date().toLocaleDateString() +" / "+ new Date().toLocaleTimeString()
    let temp = {
        cid: data.len,
        time: curtime,
        parent: data.parent,
        comment: data.text,
        userHead: data.head,
        userName: data.name,
        likeList: ""
    }
    let res1 = await commentDao.create( temp ), res2 = true
    if( data.contact ){
        res2 = await contact( { name: data.name, time: curtime } )
    }
    return res1 && res2 ? Array.from( await commentDao.findByFilter(null, { cid: temp.cid }) )[0]: ""
}

const thumbUp = async (cid, opt, ids) => {
    let list = Array.from( await commentDao.findByFilter(["likeList"], { cid }) )[0].likeList
        name = Array.from( await redis.getFromRedis(ids.sid, "name") )[0]
        res = null
    if(opt === "add"){
        res = await commentDao.update({ likeList: `${list}+${name}` }, { cid })
    }else{
        let temp = ""
        list.split("+").forEach( item => item && item !== name ? temp += `+${item}` : "" )
        res = await commentDao.update({ likeList: temp }, { cid })
    }
    return res ? Array.from(await commentDao.findByFilter(null, { cid: cid }))[0] : ""
}

const contact = async info => {
    const data = {
        to: "945215595@qq.com",
        text: `${info.name}在${info.time}给您的WebOS小站留言了，请及时查看。` //接收激活请求的链接
    }
    userService.sendEmail( data )
}

module.exports = {
    getComments,
    writeComment,
    thumbUp,
    contact
}