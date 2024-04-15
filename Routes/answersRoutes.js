const express = require("express")
const answerRoutes = express.Router()
const answerController = require("../controllers/gettingAnswers")


answerRoutes.post("/answer",answerController.getAnswerTest)


// answerRoutes.post("/answer",answerController.getAns)
answerRoutes.post("/ans",answerController.getAns)



answerRoutes.get("/all",answerController.allAns)

module.exports  = answerRoutes