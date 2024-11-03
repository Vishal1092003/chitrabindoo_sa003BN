const Profile=require("../models/Profile");
const { findById } = require("../models/User");
const User=require("../models/User")

/*----------------------------------update profile-----------------------------------*/
exports.updateProfile=async(req,res)=>{
    try{
        const { gender, dob = "", contactNumber, about = "" } = req.body;

        const User_id = req.User.id;

        if (!contactNumber || !gender || !User_id) {
            return res.status(400).json({
                success: false,
                message: "All Feilds Are Required"
            })
        }
        const userDetails = await findById(User_id);
        console.log("userDetails are ", userDetails);

        const ProfileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById({ ProfileId });

        // update profile whoch comes from input
        profileDetails.dob = dob;
        profileDetails.gender = gender;
        profileDetails.about = about;
        profileDetails.contactNumber = contactNumber;
        await profileDetails.save();

        /*-----------------------------------------------------------------------------
        await Profile.findOneAndUpdate(
            {ProfileId},
            {
                dob:dob,
                contactNumber:contactNumber,
                gender:gender,
                about:about
            }
        )
        -------------------------------------------------------------------------------*/

        return res.status(200).json({
            success: true,
            message: "Profile Details Updated Successfully",
            profileDetails
        })


    }catch(error){
        return res.status(200).json({
            success: false,
            message: error.message,
            
        })
    }   
}


/*-------------------------------------delete account-----------------------------------*/
exports.deleteAccount=async(req,res)=>{
      try{
          const User_id=req.User.id;
          if(!User_id){
            return res.status(400).json({
                success:false,
                message:"Account NOT Found"
            })
          }

          const userDetails=await User.findById(User_id);
          const profileDetails=userDetails.accountDetails;

          await Profile.findByIdAndDelete({ _id:profileDetails});
          await User.findByIdAndDelete({_id:User_id});

          return res.status(200).json({
            success:true,
            message:"Profile Deleted Successfully"
          })



      }catch(error){
          return res.status(400).json({
              success: false,
              message: "User Cannot Be Deleted Successfully"
          })
      }
}

/*--------------------------get all user details-------------------------------------*/
exports.getAllUserDetails=async(req,res)=>{
  try{
      const User_id = req.User.id;

      const userDetails = await User.findById({ User_id }).populate("additionalDetials").exec();
      return res.status(200).json({
          success: true,
          message: "User Details Fetched Successfully",
          userDetails
      })
  }catch(error){
      return res.status(400).json({
          success: false,
          message:"ERROR While Fetching User Details "
      })
  }
} 

