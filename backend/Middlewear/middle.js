const fastify = require("fastify")();

const Auth=()=>{
        fastify.register(require("@fastify/express")).after(()=>{
            fastify.use((req,res,next)=>{
                console.log("working")
                // next();
            })
        })
}
module.exports=Auth