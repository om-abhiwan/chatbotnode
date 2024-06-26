const { DataModel } = require("../models/uploadDataSchema")
const csvParser = require('csv-parser');
const fs = require('fs');


exports.uploadData = async (req, res) => {const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
  
    const questionsToInsert = [];
    const questionsToUpdate = [];
  
    try {
      // Parse the CSV file
      fs.createReadStream(file.path)
        .pipe(csvParser())
        .on('data', async (data) => {
          // Check if the question already exists in the database
          const existingQuestion = await DataModel.findOne({ question: data.question });
  
          if (existingQuestion) {
            // Update the existing question with new answers
            existingQuestion.answers = data.answers;
            questionsToUpdate.push(existingQuestion.save());
          } else {
            // Insert a new question
            questionsToInsert.push(DataModel.create({
              question: data.question,
              answers: data.answers,
            }));
          }
        })
        .on('end', async () => {
          // Wait for all updates and inserts to complete
          await Promise.all(questionsToUpdate);
          await Promise.all(questionsToInsert);
  
          res.json({ success: true, message: 'Data inserted/updated successfully' });
        });
    } catch (error) {
      console.error('Error processing data:', error);
      res.status(500).json({ error: 'Error processing data', message: error.message });
    }
}
