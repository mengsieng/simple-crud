const router = require('express').Router()

const auth = require('./auth/auth.route')
const role = require('./role/role.route')
const room = require('./room/room.route')
const roomType = require('./room/room.type.route')
const roomStatus = require('./room/room.status.route')

const middleware = require('../util/bearer.checker')

router.get('/', (req, res) => {
    res.json({
        message: 'Welcome braber'
    })
})

router.use('/auth', auth)
router.use('/role', middleware.checkToken, role)
router.use('/room', middleware.checkToken, room)
router.use('/roomType', middleware.checkToken, roomType)
router.use('/roomStatus', middleware.checkToken, roomStatus)

module.exports = router