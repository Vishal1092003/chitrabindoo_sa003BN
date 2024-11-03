const User=require("../models/User");
const OTP=require("../models/OTP")
const optGenerator=require("otp-generator")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
require("dotenv").config();



/*--------------------------------------send OTP-------------------------------------------------------*/  
exports.sendotp=async(req,res)=>{
      
   try{
       const { email } = req.body;

       const checkUserPresent = await User.findOne({ email });

       if (checkUserPresent) {
           return res.status(401).json({
               success: false,
               message: "user already registered"
           })
       }
        // generate otp
        var otp=optGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        });

        console.log("otp generated ",otp);

        //   generate otp

        const result=await OTP.findOne({otp:otp});

        while(result){
            var otp = optGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            });
            result=await OTP.findOne({otp:otp});
        }

        // but we can also use a library to generate the otp instead of doing this
         

        // insert entry of this otp to database see the otp schema
        //   i am not inserting createdAt bec. default set hai


       const otpPayload = { email, otp };

       const otpbody = await OTP.create(otpPayload);
       console.log("body of otp ", otpbody);

       res.status(200).json({
        message:"otp send successfully",
          success:true,
          otp
       })

   }catch(error){
     console.log("error while sending otp ",error);

     return res.status(500).json({
        success:false,
        message:error.message
     })
   }
    
}
/*--------------------------------------sign up-------------------------------------------------------*/


exports.signUp=async(req,res)=>{
  try{
      const {
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          contactNumber,
          otp
      } = req.body;

      if (!firstName || !lastName || !email || !password || !confirmPassword || !contactNumber || !otp) {
          return res.status(403).json({
              message: "All feilds are required",
              success: false
          })
      }

      if (password !== confirmPassword) {
          return res.status(403).json({
              message: "Password and Confirm Password Doesn't matches",
              success: false
          })
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(403).json({
              message: "User is already Registered",
              success: false
          })
      }

      /*-------------find most recent otp -----------*/
      const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
      console.log("recent otp ", recentOtp);
      /*-------------validate otp----------------------*/

      if (recentOtp.length == 0) {

          return res.status(403).json({
              message: "Otp Not Found ",
              success: false
          })
      } else if (otp !== recentOtp.otp) {
          return res.status(400).json({
              message: "Invalid  Otp ",
              success: false
          })
      }

      /*--------------------hash password----------------*/
      const hashedPssword = await bcrypt.hash(password, 10);

      /*--------------------entry in db----------------*/
      const profileDetials = await Profile.create({
          gender: null,
          dob: null,
          contactNumber: null,
          about: null
      });
      //  as in our additonalDetails we have profile 

      const user = await User.create({
          firstName,
          lastName,
          email,
          password: hashedPssword,
          confirmPassword,
          contactNumber,
          additonalDetails,
          image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`
      })


      return res.status(200).json({
          success: true,
          message: "User Registered Successfully"
      })

  }catch(error){
    return res.status(403).json({
        success:false,
        message:"User cannot be Registered ,Please try again"
    })
  }
 
    

}

/*----------------------------------------sign in -----------------------------------------------------*/

exports.signIn=async(req,res)=>{
  try{

      const { email, password } = req.body;

      if (!email || !password) {
          return res.status(400).json({
              success: false,
              message: "All feilds are required"
          })
      }

      const newHashedPassword = await bcrypt.hash(password, 10);

      const checkuser = await User.findOne({ email });

      if (!checkuser) {
          return res.status(200).json({
              success: false,
              message: "User is not Registered , Please SignUp first!"
          })

          /*----------------generate jwt after password match --------------------------*/

          if (await bcrypt.compare(password, User.password)) {
              const payload = {
                  email: User.email,
                  id: User._id
              }
              const token = jwt.sign(payload, process.env.jwt_secret, {
                  expiresIn: "2h"
              })

              User.token = token;
              User.password = undefined;

              /*-----------------create cookie and send response --------------------*/
              const options = {
                  expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
              }
              res.cookie("token", token, options).status(200).json({
                  success: true,
                  token,
                  User,
                  message: "Logged In Successfully"
              })


          } else {
              return res.status(403).json({
                  success: false,
                  message: "Password is Incorrect"
              })
          }


  }
    /**/
}catch(error){
    return res.status(500).json({
          success:false,
          message:"Login Failure ,Please Try Again"
    })
}
}

/*--------------------------------------Change Password-------------------------------------------------------*/










