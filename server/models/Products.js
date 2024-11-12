const mongoose=require("mongoose")

const productSchema=new mongoose.Schema({
    productImage:{
        type:String,
        // required:true
    },
    productName:{
       type:String,
    },
   productDescription: {
        type: String
    },
    price: {
        type: Number,
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
    }

})

module.exports = mongoose.model("Product","productSchema");