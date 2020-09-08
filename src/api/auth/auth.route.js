const router = require('express').Router()
const yup = require('yup')
const bcrypt = require('bcrypt')

const User = require('./auth.model')
const sign = require('../../lib/jwt')
const jwtChecker = require('../../util/bearer.checker')

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
    gender: yup.string().required(),
    phonenumber: yup.string().min(9).max(20),
    username: yup.string().required(),
})

router.get('/getUserProfile', jwtChecker.checkToken, async (req, res) => {
    const data = await User.query().select('name', 'DOB', 'gender', 'phonenumber', 'profileUrl')
        .where("user.id", req.decoded.id).first()
    res.json({
        data
    })
})



router.post('/signUp', async (req, res, next) => {
    const { username, password, name, DOB, gender, phonenumber, profileUrl } = req.body
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
            username, name, DOB, gender, phonenumber, profileUrl,
            password: hashedPassword,
        })
        //Making the json web token
        const payload = {
            id: insertData.id,
            username: insertData.username,
        }
        delete insertData.password
        const token = await sign.sign(payload)
        res.json(
            { token, data: insertData }
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
            id: user.id,
            username: user.username,
        }
        delete user.password
        const token = await sign.sign(payload)
        res.json({ data: user, token })
    } catch (error) {
        next(error)
    }
})

module.exports = router