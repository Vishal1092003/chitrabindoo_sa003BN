const nodemailer=require("nodemailer")
require("dotenv").config();



const mailSender=async(email,title,body)=>{
    try{ 
        let transporter=nodemailer.createTransport({
            host:process.env.mai_host,
            auth:{
                user:process.env.mail_user,
                pass:process.env.mail_pass
            }
        })

        let info=await transporter.sendMail({
            from:"CHITRABINDOO -ASHISH KUMAR",
            to:`${email}`,
            subjects:`${title}`,
            html:`${body}`
        })

        console.log(info);

        return info;


    }catch(error){
         console.log(error.message);
    }
}

module.exports = mailSender;
