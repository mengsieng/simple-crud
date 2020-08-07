const router = require('express').Router()
const auth = require('./auth/auth.route')

router.get('/', (req, res) => {
    res.json({
        message: 'Welcome braber'
    })
})

router.use('/auth', auth)

module.exports = router