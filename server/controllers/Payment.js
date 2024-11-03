const {instance}=require("../config/razorpay");
const User=require("../models/User")
const Product=require("../mdoels/product")
const mailSender=require("../utils/mailSender")

const { orderPlacingMail }=require("../mail/templates/orderPlacingMail")

/*--------------capture the payment and inititiate the  razorpay -----------------------*/
exports.capturePayment=async(req,res)=>{
   /*
   1. GET THE USER ID
   2. VALIDATION
   3.VALIDATE PRODUCT DETAILS
   4. CREATE ORDER 
   5. RETURN RESPONSE
   */
   const {product_id}=req.body;
   if(!product_id){
       return res.status(400).json({
           success: false,
           message: "Product_id Not Found"
       })
   }

    const User_id=req.User.id;

  

    let productDetails;
    try{
        productDetails = await product.findById(product_id);
        if (!productDetails) {
            return res.status(400).json({
                success: false,
                message: "Could Not Find The Course"
            })
        }

    }catch(error){
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }

    /*-------now:=>create the order--- */
    const amount=Product.price;
    const currency="INR"

    const options={
         amount:amount*100,
         currency:"INR",
         receipt:Math.random(Date.now()).toString(),
         notes:{
             product_id: product_id,
             User_id
         }
    }
    try{
        /*--initiate the payment user razorpay-- */
        const paymentResponse=await instance.orders.create(options);
        console.log(paymentResponse);
         
        return res.status(200).json({
            success:true,
            productName: Product.productName,
            productDescription: Product.description,
            amount: paymentResponse.amount,
            thumbnail:Product.thumbnail,
            Order_id:paymentResponse.id,
        })
    }catch(error){
        return res.status(400).json({
            success: false,
            message: "Could Not Initiate The Payment"
        })
    }
};

/*----------------------------verify signature--------------------------------------------- */

exports.verifySignature=async(req,res)=>{
     const webHook_secret="1234567890";
     const signature=req.headers["x-razorpay-signature"];
     /*
      signature is present in encrypted format so we first need to encrypt webHook then 
      we can match it with signature;
     */
     
    const shasum = crypto("sha256", webHook_secret);
    shasum.update(JSON.stringify(req.body));
    const digest=shasum.digest("hex");

    if(signature===digest){
        console.log("Payment is Authorized");
        // now razorpay ke pass notes mein id bheje hai check kar lena 

        const {product_id,user_id}=req.body.payload.payment.entity.notes;

        try{
            // fulfill ka action
            const emailResponse=await mailSender(
                  User.email,
                 "CHITRABINDOO",
                 "Your Order Has Been Placed ! "

            )
            console.log(emailResponse);

            return res.status(200).json({
                success:true,
                message:"Signature Veified And Course Added"
            })

        }catch(error){
            return res.status(400).json({
                success: false,
                message:error.messsage
            })
        }

        }
        else{

        return res.status(400).json({
            success: false,
            message: "Invalid Request"
        })
        }


}

