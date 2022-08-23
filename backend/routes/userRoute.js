const express = require('express')
const router = express.Router()
const {registerUser, loginUser} = require('../controllers/userController')
const notes = require('../data/notes')
router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/notes', (req,res)=>{
    res.json(notes)
})

module.exports = router