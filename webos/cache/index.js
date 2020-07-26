const Redis = require('ioredis')
const config = require('../config/cache.js')

const redis = new Redis( config )

// set
const writeIntoRedis = async (k, v) => {
    try{ 
        let res = typeof v === 'object'
         ? await redis.hset(k, v)
         : await redis.set(k, v)
        return res && await redis.expire(k, 36000)
    }catch(e){
        return new Error(e)
    }
}
// get
const getFromRedis = async (hkey, ...args)  => args.length > 0 ? await redis.hmget(hkey, ...args): await redis.get(hkey)

// update
const updateRedis = async (hkey, arr) => await redis.hmset(hkey, ...arr)

// del
const delFromRedis = async k => await redis.del(k)

module.exports = {
    writeIntoRedis,
    getFromRedis,
    delFromRedis,
    updateRedis
}