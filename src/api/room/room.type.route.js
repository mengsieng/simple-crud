const router = require('express').Router()
const yup = require('yup')

const RoomType = require('./room.type.model')

let schema = yup.object().shape({
    type: yup.string().required(),
    price: yup.number().required(),
    bed: yup.number().required(),
})

router.get('/listAll', async (req, res, next) => {
    try {
        const data = await RoomType.query().select('roomType.id', 'roomType.type', 'roomType.description',
            'roomType.price', 'roomType.bed')
            .leftJoin('roomImage', 'roomType.image_id', '=', 'roomImage.id')
        res.json({ data })
    } catch (e) {
        next(e)
    }
})

router.post('/create', async (req, res, next) => {

    const { type, price, bed, description } = req.body
    try {
        await schema.validate(req.body, {
            abortEarly: false
        })
        const existRoomType = await RoomType.query().findOne({ type }).first()
        if (existRoomType) {
            res.status(400).json({ message: 'This role already exist' })
        } else {
            const data = await RoomType.query().insert({ type, price, bed, description })
            res.json({ data })
        }
    } catch (e) {
        next(e)
    }
})

router.delete('/delete', async (req, res, next) => {
    const id = req.query

    try {
        const data = await RoomType.query().delete().where(id)
        if (data === 1) {
            res.json({ message: 'Delete complete' })
        }
        res.json({ message: 'Delete not complete' })
    } catch (e) {
        next(e)
    }
})

router.patch('/update', async (req, res, next) => {
    const id = req.query.id
    const { type, price, bed } = req.body
    try {
        const data = await RoomType.query().patchAndFetchById(id, { type, price, bed })
        res.json({ data: data, message: 'Update completed' })
    } catch (e) {
        next(e)
    }
})

module.exports = router