const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,  
    }, 
    confirmPassword: {
        type: String,
        required: true,
    },
    productsBought:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"Bought"
    },
    productsInCart:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"AddedToCart"
    },
    additonalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"Profile"
    },
    image:{
        type:String,
        required:true
    },
   /*----reset password---------*/
   token:{
    type:String,
   },
   resetPasswordExpires:{
    type:Date
   } 
})
// user=>product=>reviews

module.exports = mongoose.model("User","userSchema")