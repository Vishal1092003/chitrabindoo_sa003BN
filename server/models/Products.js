const mongoose=require("mongoose")

const productSchema=new mongoose.Schema({
    productName:{
       type:String,
    },
   description: {
        type: String
    },
    price: {
        type: String,
        required: true
    },
    productType: {
        type: String
    },
    RatingAndReview:{
        type:mongoose.Schema.Types.ObjectId,
         ref:"RatingAndReview"
    },
    thumbnail:{
        type: String,
        // required: true
    },
    tag:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Tag
    },
    BoughtBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})

module.exports = mongoose.model("Product","productSchema");