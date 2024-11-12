// const User=require("../models/User");
// const RatingAndReview=require("../models/RatingAndReview");
// const Products=require("../models/Products");

// /*-------------------------------------create Rating------------------------------------------*/
// exports.createRating=async(req,res)=>{
//     try{
//         const User_id=req.User.id;
//         const{rating,review,product_id}=req.body;
        
//         //check he had bought the product or not 
        
//         const productBought=await Products.findById({product_id});
//         const buyer=productBought.BoughtBy;

//         if(!buyer.includes(User_id)){
//             return res.status(400).json({
//                 success:true,
//                 message:"User Had Not Baught The Product Yet"
//             })
//         }
//         // check if he already reviewed
// // w 
//         // const rating_id=productBought.RatingAndReview;
//         // if(rating_id.includes(User_id)){
//         //     return res.status(200).json({
//         //         success:false,
//         //         message:"Rated Previously"
//         //     })
//         // }
//         // create rating
//         await RatingAndReview.findByIdAndUpdate({_id:rating_id}
//             ,{
//                 $push:{
//                     user:User_id
//                 },
//                 $push:{
//                     product:product_id
//                 },
//                 rate:4.5,
//                 review:"Great Product"

//             }
//         )
//         return res.status(200).json({
//             success:true,
//             message:"Rating and Review Created Successfully"
//         })
        
//     }catch(error){
//         return res.status(400).json({
//             success:false,
//             message:error.message
//         })
//     }
// }
// /*------------------------------------get average rating---------------------------------------*/
// exports.getAvgRating=async(req,res)=>{
//     const {product_id}=req.body;
//     const product=await Products.findById(product_id);
//     if(!product){
//         return res.status(400).json({
//             success:false,
//             message:"Product Does Not Exist"
//         })
//     }
//     const rate_id=product.RatingAndReview;
//     const rate=await RatingAndReview.findById(rate_id);

// }
// /*-------------------------------------get all rating---------------------------------------*/

