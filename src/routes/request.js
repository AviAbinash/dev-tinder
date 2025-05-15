const express = require("express")
const { userAuth } = require("../middleware/auth");

const connectionRequestRouter = express.Router()

connectionRequestRouter.get("/",userAuth,()=>{
    try {
        
    } catch (error) {
        
    }
})

module.exports = connectionRequestRouter