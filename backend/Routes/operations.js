const task = require("../Models/task")
const jwt = require("jsonwebtoken")
const auth = require("../Middlewear/middle")
const user = require("../Models/registerAndLogin")
const Redis= require("ioredis")
const redis = new Redis();


const opertaions = (fastify,opts,next)=>{
    
    //fetch all the task of a speceifc user
    fastify.get("/api/tasks",async(req,reply)=>{
        try {
            console.log(req.raw.userId)
            const redisTasks=await redis.lrange(req.raw.userId,0,-1);
            // console.log(redisTasks)

            if(redisTasks.length!==0){
                console.log("inside redis")
                let allTask=[];
                for(i of redisTasks){
                    allTask.push(JSON.parse(i))
                }
                // console.log(allTask,"THis is redis data")
                redis.expire(req.raw.userId,10)
                return reply.send({
                    status:"success",
                    allTask
                })
            }
            const allTask = await task.find({userId:req.raw.userId});
            // console.log(allTask,"This is the get")

            // setting redis data from database
            for(i of allTask){
                redis.rpush(i.userId,JSON.stringify(i))
            }
            // console.log(allTask,"database data")
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
            const {description,status} = req.body
            const {userId}=req.raw

      
            const newTask = await task.create({
                userId:userId,
                description:description,
                status:status
            })
            const addToRedis = await redis.rpush(userId,JSON.stringify(newTask))
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
            const selectedTask = await task.find({_id:id})
            const deletedTask = await task.deleteOne({_id:id});
            if(selectedTask.length!==0)
            await redis.del(selectedTask[0].userId)
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

        //This function sends mail for OTP



        next();

}

module.exports = opertaions