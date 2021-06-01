const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = ({
    name : {
        type : String,
        required : true,
        minLength : 3
    },
    email : {
        type : String,
        required : true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Invalid Email id 😞");
            }
        }
    },
    phone : {
        type : Number,
        required : true,
        min : 10
    },
    message : {
        type : String,
        required : true,
    }
})
 

const User = mongoose.model("User",userSchema);


module.exports = User;