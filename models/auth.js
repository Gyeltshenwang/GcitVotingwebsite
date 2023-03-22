import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    username: {
        type: String,
        
    },
    email: {
        type: String,
       
    },
    password: {
        type: String,
        

    },
    role: {
        type:String,
    },
    resetToken: String,
    resetTokenExpire: Date,

    // confirmpassword: {
    //     type: String,
    //     required: true
    // },
    emailToken: {
        type: String,

    },
    isVarified: {
        type: Boolean
    },
    date: {
        type: Date,
        default: Date.now()
    }

});

const Users = mongoose.model("Users", userSchema);
export default Users;
