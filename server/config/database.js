const mongoose =require("mongoose");

require("dotenv").config();

const mongo_uri=process.env.Mongodb_url;

const dbconnect=()=>{
    mongoose.connect(mongo_uri,{

    })
    .then(()=>{
        console.log("db connected successfully");
    })
    .catch((err)=>{
        console.log("error in db connection ",err);
        process.exit(1);
    })

}



