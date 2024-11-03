const razorpay=require("razorpay");
require("dotenv").config();

exports.instance=new razorpay({
    key_id:process.env.razorpay_key,
    key_secret:process.env.razorpay_secret
})