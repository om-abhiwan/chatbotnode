const express = require("express")
const answerRoutes = express.Router()
const answerController = require("../controllers/gettingAnswers")


// answerRoutes.post("/answer",answerController.getAnswer)
answerRoutes.post("/answer",answerController.getAnswerTest)
answerRoutes.get("/",(req,res)=>{
    res.send("Hello")
})

module.exports  = answerRoutes