//Imports
const fastify = require("fastify")({logger:false});
const dotenv = require("dotenv");
const cors=require('@fastify/cors')
const connectDB =require("./Databae/connectDB")
const loginSignup = require("./Routes/loginSignup")
const opertaions = require("./Routes/operations")
const reset = require("./Routes/reset")
//Configs
dotenv.config()
fastify.register(cors)

//Routes
fastify.register(loginSignup)
fastify.register(opertaions)
fastify.register(reset)

fastify.listen({port:process.env.PORT},async (err,address)=>{
    if(err){
        console.log(err)
    }else{
        await connectDB()
        console.log(`The server is up at ${address}`)
    }
})


