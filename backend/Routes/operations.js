const task = require("../Models/task")
const jwt = require("jsonwebtoken")
const auth = require("../Middlewear/middle")
const user = require("../Models/registerAndLogin")


const opertaions = (fastify,opts,next)=>{
    
    
    fastify.get("/api/tasks",async(req,reply)=>{
        try {
            console.log(req.raw.userId)
            const allTask = await task.find({userId:req.raw.userId});
            console.log(allTask)
            reply.send({
                status:"success",
                allTask
            })

        } catch (error) {
            reply.send({
                status:"failed",
                message:error.message
            })
        }
    })


    //Add Task
    fastify.post("/api/addTask",async (req,reply)=>{
        try {
            const {description} = req.body
            const {userId}=req.raw
            const newTask = await task.create({
                userId:userId,
                description:description
            })
            reply.send({
                status:"success",
                newTask
            })
        } catch (error) {
            reply.send({
                status:"failed",
                message:error.message
            })
        }
    })

    //Delete a task
    fastify.delete("/api/del/:id",async (req,reply)=>{
        try {
            const {id}=req.params
            const deletedTask = await task.deleteOne({_id:id});
            if(deletedTask.deletedCount!=0){
                return reply.send({
                    status:"success",
                })
            }else{
                reply.send({
                    status:"failed"
                })
            }
        } catch (error) {
            reply.send({
                status:'failed',
                message:error.message
            })
        }
    })

    //Edit a Task
    fastify.put("/api/edit/:id",async (req,reply)=>{
        try {
            const {id}=req.params
            await task.findOneAndUpdate({_id:id},{
                description:req.body.description
            })
            reply.send({
                status:"success"
            })
        } catch (error) {
            reply.send({
                status:"failed",
                message:error.message
            })
        }
    })

        //middleware
        fastify.register(require("@fastify/express")).after(()=>{
            fastify.use((req,res,next)=>{
                const token = req.headers.authorization;
                if(token){
                    const checked = jwt.verify(token,process.env.MY_JWT_SECRET)
                    req.userId=checked.userId;
                    next();
                }else{
                    res.send({
                        status:"failed",
                        message:"Access Forbidden"
                    })
                }
            })
        })
        next();

}

module.exports = opertaions