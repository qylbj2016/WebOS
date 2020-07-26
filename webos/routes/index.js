const router = require('koa-router')()
const loader = require('../utils/loader')

router.get('/initData', loader.get('/initData'))
router.get('/upToken', loader.get('/upToken') )

router.post('/login', loader.get('/login'))
router.post('/register', loader.get('/register'))
router.get('/checkCode', loader.get('/checkCode'))
router.get('/euser', loader.get('/checkUserIsExisted'))
router.get('/ename', loader.get('/checkNameIsRepeated'))
router.get('/sendCode', loader.get('/sendCode'))
router.post('/forget', loader.get('/forget'))

router.post('/updateApps', loader.get('/updateApps'))
router.post('/updatePreData', loader.get('/updatePreData'))

router.get('/getComments', loader.get('/getComments'))
router.post('/writeComment', loader.get('/writeComment'))
router.get('/thumbUp', loader.get('/thumbUp'))

module.exports = router
