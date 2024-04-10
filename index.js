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

const data = [
  { question: "What is your name?", answer: "My name is Chatbot." },
  { question: "What is your age?", answer: "My age is 20 What about you" },
  { question: "What is your gender?", answer: "My Gender is Male." },
  { question: "How are you?", answer: "I'm fine, thank you!" },
  { question: "Where are town houses located?", answer: "Town houses are located in Mamsha AlSaadiyat, Alghadeer." },
  { question: "What is the APPROXIMATE cost of 2 bedroom townhouse in Mamsha Al Saadiyat ?", answer: "The APPROXIMATE cost of 2 bedroom townhouse in Mamsha Al Saadiyat starts from 4662700 AED." },
  { question: "What is the date of completion of Reflection?", answer: "The date of completion of Reflection is 01-06-2021." },
  { question: "Which types of property Reflection includes?", answer: "The total numberof units in Reflection is 374." },
  { question: "Which type of units the Reflection has?", answer: "Types of property Reflection includes Apartments." },
  { question: "What is the size range of property in Reflections?", answer: "Type of units the Reflection has is Studio- 3 bedroom apartments." },
  { question: "What is the approximate starting price of the apartment in Reflection?", answer: "The size range of property in Reflections is 42 m2 - 147 m2." },
  { question: "What is the payment plan of Reflection?", answer: "The approximate starting price of the apartment in Reflection is 956,300 AED." },
  { question: "Is there any available unit for sale or rent in Reflection project?", answer: "Yes,there are available unit for sale or rent in Reflection project." },
  { question: "What is the current status of The Bridges?", answer: "The payment plan of Reflection is · Down payment 5% upon signing SPA · INSTALLMENT#1 5% Super structure · INSTALLMENT#2 10% Facade closure · Final Payment 80% Handover." },
];

function calculateSimilarity(str1, str2) {
  const similarity = (str1.length + str2.length) / 2;
  let matches = 0;
  for (let i = 0; i < str1.length; i++) {
    if (str2.includes(str1[i])) {
      matches++;
    }
  }
  const percentage = (matches / similarity) * 100;
  return percentage;
}

app.use(express.json());

app.post('/chat', (req, res) => {
  const { message } = req.body;

  let bestMatch = null;
  let maxSimilarity = 0;
  for (const item of data) {
    const similarity = calculateSimilarity(message.toLowerCase(), item.question.toLowerCase());
    if (similarity > maxSimilarity) {
      maxSimilarity = similarity;
      bestMatch = item;
    }
  }

  if (maxSimilarity >= 90 && bestMatch) {
    res.json({ message: bestMatch.answer });
  } else {
    res.json({ message: "I'm sorry, I didn't understand that." });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
