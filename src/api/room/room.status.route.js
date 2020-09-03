const router = require('express').Router()
const yup = require('yup')

const RoomStatus = require('./room.status.model')

router.get('/listAll', async (req, res, next) => {
    try {
        const data = await RoomStatus.query().select('*')
        res.status(200).json(data)
    } catch (e) {
        next(e)
    }
})

router.post('/')


module.exports = router