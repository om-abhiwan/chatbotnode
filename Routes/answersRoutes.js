const express = require("express")
const answerRoutes = express.Router()
const answerController = require("../controllers/gettingAnswers")


// answerRoutes.post("/answer",answerController.getAnswer)
answerRoutes.post("/answer",answerController.getAnswerTest)


answerRoutes.post("/ans",answerController.getAns)

answerRoutes.get("/all",answerController.allAns)

module.exports  = answerRoutes