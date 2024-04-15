const { DataModel } = require("../models/uploadDataSchema")
const csvParser = require('csv-parser');
const fs = require('fs');
const UploadMedia = require("../models/uploadMediaSchema");


exports.uploadData = async (req, res) => {
  const file = req.file;

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
          await existingQuestion.save();




          // updating media or inserting new if question is same
          const mediaData = await UploadMedia.find({ question_id: existingQuestion._id.toString() });        
          // Update or create video media
          if (data.video) {
            const videoMedia = mediaData.find(media => media.categories === "video");
            if (videoMedia) {
              // Update existing video media
              videoMedia.link = data.video;
              await videoMedia.save();
            } else {
              // Create new video media
              await UploadMedia.create({
                link: data.video,
                categories: "video",
                question_id: existingQuestion._id.toString()
              });
            }
          }
          // Update or create PDF media
          if (data.pdf) {
            const pdfMedia = mediaData.find(media => media.categories === "PDF");
            if (pdfMedia) {
              // Update existing PDF media
              pdfMedia.link = data.pdf;
              await pdfMedia.save();
            } else {
              // Create new PDF media
              await UploadMedia.create({
                link: data.pdf,
                categories: "PDF",
                question_id: existingQuestion._id.toString()
              });
            }
          }
          // Update or create image media
          if (data.image) {
            const imageMedia = mediaData.find(media => media.categories === "Images");
            if (imageMedia) {
              // Update existing image media
              imageMedia.link = data.image;
              await imageMedia.save();
            } else {
              // Create new image media
              await UploadMedia.create({
                link: data.image,
                categories: "Images",
                question_id: existingQuestion._id.toString()
              });
            }
          }








        } else {
          // Insert a new question
          const newData = await DataModel.create({
            question: data.question,
            answers: data.answers,
          });
          // to save video in db corresponding to the question
          if (data.video) {
            await UploadMedia.create({
              link: data.video,
              categories: "video",
              question_id: newData._id.toString()
            })
          }


          // to save pdf in db corresponding to the question
          if (data.pdf) {
            await UploadMedia.create({
              link: data.pdf,
              categories: "PDF",
              question_id: newData._id.toString()
            })
          }


          // to save image in db corresponding to the question
          if (data.image) {
            await UploadMedia.create({
              link: data.image,
              categories: "Images",
              question_id: newData._id.toString()
            })
          }
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
