const user = require("../Models/registerAndLogin")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


const loginSignup = (fastify,opts,next)=>{
    fastify.post("/signup",async (req,reply)=>{
        try {
            const {fname,mname,lname,email,phone,password}=req.body;
            const existingUser = await user.find({email:email});
            if(existingUser.length!=0){
                return reply.send({
                    status:"failed",
                    message:"email already exists"
                })
            }else{
            const hashedPassword =await bcrypt.hash(password,10)
            const newUser = await user.create({
                fname:fname,
                mname:mname,
                lname:lname,
                email:email,
                phone:phone,
                password:hashedPassword
            })
            reply.send({
                status:"success"
            })
        }
        } catch (error) {
            reply.send({
                status:"failed",
                message:error
            })
        }
    })

    fastify.post("/login",async(req,reply)=>{
        try {
            const {email,password}=req.body;
            const loginUser = await user.find({email:email})
            // console.log(loginUser)
            if(loginSignup.length==0){
                return reply.send({
                    message:"No user found"
                })
            }else{
                const checkPassword = await bcrypt.compare(password,loginUser[0].password)
                if(checkPassword){
                    const token = jwt.sign({userId:loginUser[0]._id},process.env.MY_JWT_SECRET)
                    reply.send({token})
                }else{
                    reply.send({
                        status:"failed",
                        message:"Password didn't match"
                    })
                }
            }
        } catch (error) {
            reply.send({
                status:"failed",
                message:error
            })
        }
    })

    next();
}
module.exports = loginSignup