const Tag=require("../models/Tag")


/*--------------------------create tag---------------------------------------------------*/
exports.Tags=async(req,res)=>{
    try{
       const {name,description}=req.body;

       if(!name || !description){
           return res.status(403).json({
               success: false,
               message:"All Feilds Are Required"
           })
       }
      
       const TagDetails=await Tag.create({
          tagName:name,
           description: description
       })
       console.log("tag details are ",TagDetails);
        
        return res.status(403).json({
            success: true,
            message: "Tag Created Successfully"
        })


    }catch(error){
        return res.status(403).json({
            success:false,
            message:error.message
        })
    }
}

/*-----------------get all TAG handler function------------------------------------------------------------*/
exports.showAllTags=async(req,res)=>{
    try{
        const allTags = await Tag.find({}, {tagName:true},{description:true});
        return res.status(400).json({
            success: true,
            message: "All tags RE=eturned Successfully",
            allTags
        })

    }catch(error){
        return res.status(400).json({
            success:false,
            message:error.message
        })
    }
}
