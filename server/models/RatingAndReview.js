const mongoose=require("mongoose")

const ratingAndReviewSchema=new mongoose.Schema({
     user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
     },
     product:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Products"
     },
     rating:{
        type:Number,
        required:true
     },
     review:{
        type:String,
        required:true
     }
     
})

module.exports = mongoose.model("RatingAndReview","ratingAndReviewSchema")