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
    Designation:{
        type:String
    },
    
    Expert_field:{
        type:String
    },
    Experience:{
        type:Number
    },
    
    social_id:{
        type:String,
        required: [true, " cannot be empty"]
    }

})

module.exports = mongoose.model('Mentor', userSchema);