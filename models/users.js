const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Name cannot be empty"]
    },
    email:{
        type: String,
        required: [true, "Email cannot be empty"]
    },
   
    
    password:{
        type: String,
        required: [true, "Password cannot be empty"]
    },
    image:{
        type:String,
        required:false
    },
    
    branch:{
        type:String
    },
    year:{
        type:Number
    },
    skill1:{
        type:String
    },
    skill2:{
        type:String
    },
    skillrequired1:{
        type:String
    },
    skillrequired2:{
        type:String
    },
    social_id:{
        type:String,
        required: [true, "Email cannot be empty"]
    }

})

module.exports = mongoose.model('User', userSchema);