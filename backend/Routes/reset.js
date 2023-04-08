const {sendMail} = require("../controller/sendMail")
const {verifyOTP} =require("../controller/sendMail")
const {updatePassword}=require("../controller/sendMail")
const reset= (fastify,opts,done)=>{
    fastify.post("/otp-mail",sendMail)
    fastify.post("/verify-otp",verifyOTP)
    fastify.post("/reset-password",updatePassword)
    done()
}

module.exports = reset