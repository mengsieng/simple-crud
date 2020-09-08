const router = require('express').Router()
const yup = require('yup')

const Room = require('./room.model')

let schema = yup.object().shape({
    number: yup.number().required(),
    roomtype_id: yup.number().required()
})

router.get('/listAll', async (req, res, next) => {
    const { roomtype_id } = req.query
    try {
        await Room.query().select('room.id', 'room.number', 'roomType.type', 'roomType.price', 'roomStatus.status', 'imageUrl')
            .join('roomType', 'room.roomtype_id', '=', 'roomType.id')
            .join('roomStatus', 'room.roomstatus_id', '=', 'roomStatus.id')
            .where('room.roomtype_id', '=', roomtype_id)
            .then(data => {
                res.status(200).json({ data })
            })
    } catch (e) {
        next(e)
    }
})
router.post('/createRoom', async (req, res, next) => {
    const { number, roomtype_id } = req.body
    let roomstatus_id = 1
    try {
        await schema.validate(req.body, {
            abortEarly: false
        })
        const existRoom = await Room.query().findOne({ number }).first()
        if (existRoom) {
            res.status(403).json({
                message: 'This room already exist'
            })
        } else {
            const data = await Room.query().insert({ number, roomstatus_id, roomtype_id })
            res.status(200).json(data)
        }
    } catch (e) {
        next(e)
    }
})

module.exports = router