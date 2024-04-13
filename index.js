require("dotenv").config()
require("./DB/conn")

const express = require('express');
// require for file 

const app = express();
const cors = require("cors")
app.use(cors({origin: '*'}))

const uploadQuestion = require("./Routes/uploadQuestions");
const answerRoutes = require("./Routes/answersRoutes");

app.use(express.json())
app.use(uploadQuestion)
app.use(answerRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
