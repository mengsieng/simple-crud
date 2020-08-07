const router = require('express').Router()
const yup = require('yup')
const bcrypt = require('bcrypt')

const User = require('./auth.model')
const sign = require('../../lib/jwt')

let schema = yup.object().shape({
    // email: yup
    //     .string()
    //     .trim()
    //     .email()
    //     .required(),
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
    username: yup.string().required()
})

router.get('/getUser', async (req, res) => {
    const data = await User.query().select('*')
    res.json({
        message: data
    })
})

router.post('/signIn', async (req, res, next) => {
    const { username, password, name, role, DOB, address, phonenumber, profileUrl } = req.body
    try {
        const createUser = {
            username, password, name, role, DOB, address, phonenumber, profileUrl
        }
        //This is the validate the body
        await schema.validate(createUser, {
            abortEarly: false
        })
        //This is the checking existing user
        // const existUser = await User.query().where({ email }).first()
        // if (existUser) {
        //     res.status(403)
        // }
        const hashedPassword = await bcrypt.hash(password, 12)
        //Making the json web token
        // delete createUser.password
        const payload = {
            // id: createUser.id,
            username: createUser.username,
        }
        const token = await sign.signIn(payload)
        // const insertData = await User.query().insert({
        //     email,
        //     password,
        // })
        res.json(
            // usner,
            token
        )
    } catch (e) {
        next(e)
    }
})

module.exports = router