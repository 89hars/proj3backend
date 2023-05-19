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
        await User.create({ email: req.body.email, password: passwordHash })
        res.status(201).json({ message: "new user in there !" })
    } catch (error) {
        console.log("there is an error in the post signup", error)

    }


})

//post to login
router.post('/login', async (req, res) => {
    try{
    //user exist or no ? 
    const existingUser = await User.findOne({ email: req.body.email })
    if (existingUser) //when user exist we check password 
    {
        if (bcryptjs.compareSync(req.body.password, existingUser.password)) {
            // this is what we do when password ok
            const authToken = jwt.sign(
                { userId: existingUser._id },
                process.env.TOKEN_SECRET,
                { algorithm: 'HS256', expiresIn: "6h" }
            )
            res.json(authToken)

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
router.get('/verify', isAuthenticated, (req, res) => {

    res.status(200).json({ message: 'User is authenticated', payload: req.auth })
})

module.exports = router