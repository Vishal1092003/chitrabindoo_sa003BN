const Products=require("../models/Products")
const User=require("../models/User")
const Tag=require("../models/Tag")

const {imageUploadToCloudinary}=require("../utils/ImageUploader")
require("dotenv").config()

/*---------Note: THIS CAN ONLY BE DONE THROUGH ADMIN---------*/

/*-------------------------create product handler -----------------------------------------------*/
exports.createProduct=async(req,res)=>{
  try{
      const { productName, description, price, tag } = req.body;
      /*----tag here is an id check Product model----*/
      const thumbnail = req.files.thumbnailImage;
      if (!productName || !description || !price || !tag) {
          return res.status(400).json({
              success: false,
              Message: "All Feilds Are Required"
          })
      }

      /*------check for ADMIN-----*/
      const userId = req.User.id;
      const productDetails = await User.findById({ userId });

    //verify that userId and productDetails._id is same or different?

      console.log("product details are ", productDetails);

      if (!productDetails) {
          return res.status(400).json({
              success: false,
              Message: "ADMIN Details Not Found"
          })
      }
      /*------check given tag is valid or not -----*/
      const tagDetails = await Tag.findById({ tag });
      if (!tagDetails) {
          return res.status(400).json({
              success: false,
              Message: "Tag Details Not Found"
          })
      }
      /*----upload image ------*/
      const uplaodImage = await imageUploadToCloudinary(thumbnail, process.env.folder_name);

      /*----create an entry for new course ------*/
      const newProduct = await Products.create({
          productName,
          description,
          admin: productDetails._id,
          price,
          tag: tagDetails._id,
          thumbnail: uplaodImage.secure_url
      })

      /*------add new product to the user schema of admin-------*/
      await User.findOneAndUpdate(
          { _id: productDetails._id },
          {
              $push: {
                  products: newProduct._id
              }
          }
      )
      /*----update the tag ka schema ------*/
      // homework

      return res.status(200).json({
          success: true,
          Message: "Prouct Created Successfully"
      })
  }catch(error){
      return res.status(400).json({
          success: false,
          Message: "Failed To Create The new  Product",
          error:error.message
      })
  }
}

/*----------------------------get all products handler--------------------------------------------*/
/**/
exports.showAllProducts=async(req,res)=>{
    try{
       const allProducts=await Products.find({},{
           productName:true, 
           description:true, 
           price:true, 
           tag:true,
           thumbnail:true,
           RatingAndReview:true,
           admin:true
       }).populate("admin")
       .exec()
       
        return res.status(200).json({
            success: true,
            Message: "Data for all courses fetched SuccessFully",
            data: allProducts
        })


    }catch(error){
        return res.status(200).json({
            success: false,
            Message: error.message,
            
        })
    }
}

/*-----------------------------------------------get product detials---------------------------*/
exports.getProductDetails=async(req,res)=>{
    try{
        const {product_id}=req.body;
        const productDetails=await Products.find({product_id})
                                          .populate("admin")
    }catch(error){

    }
}

