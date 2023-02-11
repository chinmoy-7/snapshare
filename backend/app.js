//Imports
const fastify = require("fastify")({logger:false});
const dotenv = require("dotenv");
const cors=require('@fastify/cors')
const connectDB =require("./Databae/connectDB")
const loginSignup = require("./Routes/loginSignup")
const opertaions = require("./Routes/operations")
//Configs
dotenv.config()
fastify.register(cors)

//Routes
fastify.register(loginSignup)
fastify.register(opertaions)

fastify.listen({port:process.env.PORT},async (err,address)=>{
    if(err){
        console.log(err)
    }else{
        await connectDB()
        console.log(`The server is up at ${address}`)
    }
})


