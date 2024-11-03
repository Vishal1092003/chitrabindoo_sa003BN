const mongoose=require("mongoose");
const mailSender = require("../utils/mailSender");

const OTPschema=new mongoose.Schema({
    email:{
       type:String,
       requierd:true
    },
    otp:{
        type: String,
        requierd: true
    },
    createdAt:{
           type:Date,
           default:Date.now(),
           expires:5*60
    }
})

// schema ke baad and model ke pehle =this location is for sending mail for otp

async function sendVerificationMail(mail,otp){
    try{

        const mailResponse = await mailSender(email, "Verification Email from ChidraBindoo", otp);
        console.log("email sent successfully ",mailResponse);
    }
    catch(error){
       console.log("error while sending mail ",error);
       throw error;
    }
}


// pre middleware

OTPschema.pre("save",async function(next){
    await sendVerificationMail(this.mail,this.otp);
    next();
}) 

module.exports = moongoose.model("OTP","OTPschema");