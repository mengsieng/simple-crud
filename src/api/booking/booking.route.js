const router = require('express').Router()

const Booking = require('./booking.model')

router.get('/listAll', async (req, res) => {
    const data = req.decoded.id
    res.json({ data })
})

router.post('/createBooking', async (req, res, next) => {
    const { check_in_date, room_id } = req.body
    const bookDate = new Date().toISOString().
        replace(/T/, ' ').
        replace(/\..+/, '')
    const user_id = req.decoded.id
    try {
        const data = await Booking.query().insert({ check_in_date, bookDate, user_id, room_id })
        res.json({ data })
    } catch (e) {
        next(e)
    }
})


module.exports = router