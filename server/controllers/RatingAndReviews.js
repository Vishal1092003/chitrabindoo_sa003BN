const User=require("../models/User");
const RatingAndReview=require("../models/RatingAndReview");
const Products=require("../models/Products");

/*-------------------------------------create Rating------------------------------------------*/
exports.createRating=async(req,res)=>{
    try{
        const User_id=req.User.id;
        const{rating,review,product_id}=req.body;
        
        //check he had bought the product or not 
        const BoughtDetails=await .findById({User_id});
        if(BoughtDetails){
            return res.status(400).json({
                success:false,
                message:"User Had Not Bought The Order"
            })
        }
        // check if he already reviewed
          

    }catch(error){
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}
/*------------------------------------get average rating---------------------------------------*/

/*-------------------------------------get all rating---------------------------------------*/

