const mongoose=require("mongoose");

const Tag=new mongoose.Schema({
     tagName:{
        type:String,
        required:true
     },
     description:{
         type: String,
        //  required: true
     }
})

module.exports=mongoose.model("ProductTag","Tag");