const router = require('express').Router()
const auth = require('./auth/auth.route')
const role = require('./role/role.route')
const middleware = require('../util/bearer.checker')

router.get('/', (req, res) => {
    res.json({
        message: 'Welcome braber'
    })
})

router.use('/auth', auth)
router.use('/role', middleware.checkToken, role)

module.exports = router