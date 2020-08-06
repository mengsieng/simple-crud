const router = require('express').Router()
// const User = require('./auth.model')

router.get('/getUser', (req, res) => {
    res.json({
        message: 'yes bro'
    })
})

module.exports = router