const User=require("../models/User")
const mailSender=require("../utils/mailSender")

/*-------------------------Reset Password Token--------------------------------------*/
 exports.ResetPasswordToken=async(req,res)=>{
      try{
          const { email } = req.body;

          const thisuser = await User.findOne({ email });
          if (!thisuser) {
              return res.status(403).json({
                  success: false,
                  message: "Your Email is Not Registered "
              })
          }
          /*--------------------- generate token --------------------*/
          const token = crypto.randomUUID();

          /*-----update user by adding token and expiration Time------*/   
          const updateDetails = await User.findOneAndUpdate(
              {
                  email: email
              },
              {
                  token: token,
                  resetPasswordExpires: Date.now() + 5 * 60 * 1000
              },
              { new: true }
          )

          /*---------------------  create url--------------------*/  
          const url = `http://localhost:3000/update-password/${token}`


          /*----------send the mail containing the url ---------------*/
          await mailSender(email, "PassWord Reset Link", `PassWord Reset Link:${url}`);
        
          /*-----------------return response------------------*/
          return res.json({
              success: true,
              message: "Email sent Successfully"

          })

      }catch(error){
          return res.status(400).json({
              success: false,
              message: "something went wrong"

          })
      }
}

/*-------------------------Reset Password --------------------------------------------*/
exports.resetPassWord=async(req,res)=>{
    try{
      const{password,confirmPassword,token}=req.body;

      if(password!==confirmPassword){
        return res.status(403).status({
            success:false,
            message:"Password Not Matching"
        })
      }
      /*----------------get user details from db using token--------------------------*/
      const userDetails=await User.findOne({token:token});

        if (!userDetails){
            return res.status(403).status({
                success: false,
                message: "Token Is Invalid"
            })
        }
        /*----------------------token time check-------------------------------------*/
        if(Userdetails.resetPasswordExpires<Date.now()){
            return res.status(403).status({
                success: false,
                message: "Token Is Expired"
            })
        }

        /*-----------------------Update the Password--------------------------------*/
        await User.findOneAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true}
        )

        return res.status(403).status({
            success: true,
            message: "Password Reset Successfully"
        })


    }catch(error){

    }
}



