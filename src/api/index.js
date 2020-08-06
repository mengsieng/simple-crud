const router = require('express').Router()
const auth = require('./auth/auth.route')

router.use('/auth', auth)

router.get('/', (req, res) => {
    res.send('helelfhs')
})

module.exports = router