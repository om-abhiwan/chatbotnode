const express = require("express")
const answerRoutes = express.Router()
const answerController = require("../controllers/gettingAnswers")


// answerRoutes.post("/answer",answerController.getAnswer)
answerRoutes.post("/answer",answerController.getAnswerTest)

module.exports  = answerRoutes