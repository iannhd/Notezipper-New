const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const protect = asyncHandler(async(req, res, next) => {
    let token
    console.log(req.headers.authorization, "===> req.headers protect")
    console.log(req.headers.authorization.startsWith("Bearer"), "===> dari atasnya IF")
    if( req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        try{
            token = req.headers.authorization.split(' ')[1]
            // decode token id
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select("-password")
            console.log(req.user, "===> dari protect")
            console.log(token, "===> token dari protect")
            next()

         } catch(error){
            res.status(401)
            throw new Error("Not authorized, token failed")
         }
    }

    if(!token){
        res.status(401)
        throw new Error("Not authorized, no token")
    }
})

module.exports = {protect}

