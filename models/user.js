const mongoose=require('mongoose');

const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type : String,
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type  :String,
        required : true
    }
    
});

// userSchema.methods.comparePassword = async function(newPassword){
//     try{
//         return this.password === newPassword ;
//     }
// catch(err){
//         throw err;
// }
// }

userSchema.pre('save',async function(next){
    const user = this

    if(!user.isModified('password')) return next();
    try{
        const salt = await bcrypt.genSalt(10);

        const hashedPassword  = await bcrypt.hash(user.password,salt)

        user.password = hashedPassword;
        next();
    }
    catch(err){
        return next(err);
    }
})
userSchema.methods.comparePassword = async function(newPassword){
        try{
            const isMatched = await bcrypt.compare(newPassword,this.password)
            return isMatched;
        }
    catch(err){
            throw err;
    }
}

const UserModel = mongoose.model('UserModel',userSchema)

module.exports = UserModel;