const express = require("express")
const uploadQuestion = express.Router()
const FileController = require("../controllers/UploadControllers")

// for file uploading
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

uploadQuestion.post("/upload",upload.single('file'),FileController.uploadData)


module.exports  = uploadQuestion