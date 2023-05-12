const nodemailer = require("nodemailer")
const user = require("../Models/registerAndLogin")
const bcrypt = require("bcrypt")

const generateOTP=()=>{
    const OTP = parseInt(Math.random()*1000000)
    return OTP;
}


const sendMail=async (req,res)=>{
    try {
        const {email} = req.body
        const checkUser = await user.find({"email":email})
        let OTP,hashedOTP;

        //It checks whether there are any user of that certain email
        if(checkUser.length==0){
            res.send({
                status:"no_user"
            })
            return
        }else{
             OTP=await generateOTP();
             console.log("Working")
             hashedOTP=await bcrypt.hash(OTP.toString(),10)
        }

        let transporter = await nodemailer.createTransport({
        host:"smtp-relay.sendinblue.com",
        port:587,
        auth:{
            user:"chinmoydehingia4@gmail.com",
            pass:"cP1OZhwxICmG3rTs"
        }
    })

    let info = await transporter.sendMail({
        from:'"Chinmoy Dehingia" <chinmoydehingia@gmail.com>',
        to:email,
        subject:"OTP Authentication",
        text:"OTP",
        html:`<p>Your OTP is <b>${OTP}</b></p>`
    })  
    console.log("Email sent: ",info.messageId);
    res.send({
        status:"success",
        info,
        OTP:hashedOTP
    })
    } catch (error) {
        res.send({
            status:"failed",
            error
        })
    }
    

}

//VeRify the OTP
const verifyOTP=async (req,res)=>{
    const {OTP,hashedOTP}=req.body
    const result=await bcrypt.compare(OTP,hashedOTP.hashedOTP)
    console.log(result)
    res.send({
        result
    })
}

const updatePassword=async(req,res)=>{
    const {email,password}=req.body
    console.log(email,password)
    // const updateUser = await user.find({email:email})
    // console.log(updateUser)
    // if(updateUser.length==0){
    //     return res.send({
    //         status:"no_user"
    //     })
    // }
    const hashedPassword  = await bcrypt.hash(password.password,10)
    const updatedUser = await user.findOneAndUpdate({email:email},{password:hashedPassword})
    res.send({
        status:"success"
    })
    console.log(updatedUser)
}

module.exports = {sendMail,verifyOTP,updatePassword}