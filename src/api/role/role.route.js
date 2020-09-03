const router = require('express').Router()

const Role = require('./role.model')

router.post('/create', async (req, res, next) => {
    const role = req.body
    try {
        const existRole = await Role.query().findOne(role)
        if (existRole) {
            res.status(400).json({ message: 'This role already exist' })
        }
        const newRole = await Role.query().insert(role)
        res.json({ data: newRole })
    } catch (error) {
        next(error)
    }
})

router.get('/listAll', async (req, res) => {
    try {
        const data = await Role.query().select('*')
        res.json({ data })
    } catch (e) {
        next(e)
    }

})

router.delete('/delete', async (req, res) => {
    const id = req.query
    const data = await Role.query().delete().where(id)
    if (data === 1) {
        res.json({ message: "Delete Complete" })
    }
    res.json({ message: 'Not Complete' })
})

module.exports = router