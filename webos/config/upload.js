const qiniu = require('qiniu')

// 创建上传凭证
const accessKey = 'efhZLeyfQTHNjx1KyhilW1KwcbmY8gmBSD-lFV3A'
const secretKey = 'AkHJaKJUMrKcdQv2hKryp6T7sT8EgyIgSzCQlJkN'
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
const options = {
  scope: 'cincosite',
  expires: 3600
}
const putPolicy = new qiniu.rs.PutPolicy(options)
const uploadToken = putPolicy.uploadToken(mac)

module.exports = {
  uploadToken
}