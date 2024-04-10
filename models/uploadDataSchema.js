const mongoose = require("mongoose")


const dataSchema = new mongoose.Schema({
    question:{
        type:String,
        required:true
    },answers:{
        type:String,
        required:true
    }
})

exports.DataModel = mongoose.model("questions", dataSchema )
