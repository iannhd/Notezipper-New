const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false
        },
        pic: {
            type: String,
            required: true,
            default: 
            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
        },
    },
    {
        timestamps: true
    }

    
)

UserSchema.methods.matchPassword = async function matchPassword(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

UserSchema.pre('save', async function(next) {

    const salt = await bcrypt.genSalt(10)
    this.password = bcrypt.hashSync(this.password, salt)
    console.log(this.password, "====> setelah salt");
    next()
})





const User = mongoose.model('User', UserSchema)
module.exports = User

