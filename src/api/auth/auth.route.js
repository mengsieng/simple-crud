const router = require('express').Router()
const yup = require('yup')
const bcrypt = require('bcrypt')

const User = require('./auth.model')
const Role = require('./role.model')
const sign = require('../../lib/jwt')
const tableNames = require('./../../constants/tablename')

let schema = yup.object().shape({
    password: yup
        .string()
        .min(8)
        .max(200)
        .matches(/[^A-Za-z0-9]/, 'password must contain a special character')
        .matches(/[A-Z]/, 'password must contain an uppercase letter')
        .matches(/[a-z]/, 'password must contain a lowercase letter')
        .matches(/[0-9]/, 'password must contain a number')
        .required(),
    name: yup.string().required(),
    DOB: yup.date(),
    address: yup.string(),
    phonenumber: yup.string().min(9).max(20),
    username: yup.string().required(),
    role: yup.number()
})

router.post('/getUser', async (req, res) => {
    // const data = await User.query().select('*')
    const { username } = req.body
    const existUser = await User.query().findOne({ username }).first()
    res.json({
        message: existUser
    })
})

router.post('/signUp', async (req, res, next) => {
    const { username, password, name, role_id, DOB, address, phonenumber, profileUrl } = req.body
    try {
        //This is the validate the body
        await schema.validate(req.body, {
            abortEarly: false
        })
        //This is the checking existing user
        const existUser = await User.query().findOne({ username }).first()
        if (existUser) {
            res.status(403).json({
                message: 'This user already exist'
            })
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        const insertData = await User.query().insert({
            username, name, role_id, DOB, address, phonenumber, profileUrl,
            password: hashedPassword,
        })
        //Making the json web token
        const payload = {
            id: insertData.id,
            username: insertData.username,
        }
        const token = await sign.sign(payload)
        res.json(
            { token }
        )
    } catch (e) {
        next(e)
    }
})

router.post('/signIn', async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await User.query().findOne({ username }).first()
        if (!user) {
            res.status(403).json({ message: 'Wrong username or password' })
        }
        const validatePassword = await bcrypt.compare(password, user.password)
        if (!validatePassword) {
            res.status(403).json({ message: 'Wrong username or password' })
        }
        const payload = {
            id: user.user_id,
            username: user.username,
        }
        const token = await sign.sign(payload)
        res.json({ token })
    } catch (error) {
        next(error)
    }
})

router.post('/addRole', async (req, res, next) => {
    const role = req.body
    try {
        const existRole = await Role.query().findOne(role)
        if (existRole) {
            res.status(400).json({ message: 'This role already exist' })
        }
        const newRole = await Role.query().insert(role)
        res.json(newRole)
    } catch (error) {
        next(error)
    }
})

router.get('/getRole', async (req, res) => {
    // const data = await connection.select('*').from(tableNames.role)
    const data = await Role.query().select('*').from(tableNames.role)
    res.json({
        data
    })
})

router.delete('/deleteRole', async (req, res) => {
    const role_id = req.query
    const data = await Role.query().delete().where(role_id)
    if (data === '1') {
        res.json({ message: "Delete Complete" })
    }
    res.json({ message: 'Not Complete' })
})

module.exports = router