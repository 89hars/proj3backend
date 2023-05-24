const router = require("express").Router()
const User = require('../models/User.model')
const bcryptjs = require('bcryptjs')
const jwt = require("jsonwebtoken")
const { isAuthenticated } = require('../middleware/jwt.middleware')

router.get("/", (req, res, next) => {
    res.json("Auth is ok")
})


//post to signup
router.post("/signup", async (req, res) => {
    // salt generated
    const salt = bcryptjs.genSaltSync(13)

    // password hashed
    const passwordHash = bcryptjs.hashSync(req.body.password, salt)

    try {
        await User.create({ firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, password: passwordHash })
        res.status(201).json({ message: "new user in there !" })
    } catch (error) {
        console.log("there is an error in the post signup", error)

    }


})

//post to login
router.post('/login', async (req, res) => {
    try {
        //user exist or no ? 
        const user = await User.findOne({ email: req.body.email })
        if (user) //when user exist we check password 
        {
            if (bcryptjs.compareSync(req.body.password, user.password)) {
                // this is what we do when password ok
                const token = jwt.sign(
                    { userId: user._id },
                    process.env.VITE_TOKEN_SECRET,
                    { algorithm: 'HS256', expiresIn: "6h" }
                )
                user.password = ""
                res.json({ token, user })
            }
            else {
                res.render('auth/login')
                console.log("Username or password incorrect")

            }
        }

        // if user doest not exist
        else {
            res.render('auth/login')
        }
    }
    catch (err) { console.log("Error in login route", err) }
})

//get to verify
router.get('/verify', isAuthenticated, async (req, res) => {
    const userId = req.auth.userId
    const user = await User.findById(userId)
    user.password = ""
    res.status(200).json({ message: 'User is authenticated', user })
})

module.exports = router