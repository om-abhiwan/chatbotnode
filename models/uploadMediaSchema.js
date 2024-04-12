const mongoose = require("mongoose")

const MediaSchema = new mongoose.Schema({

    question_id: {
        type: String,
        required: true
    },

    categories:{
        type:String,
        required:"true"
    },
    
    link:{
        type:String,
        required:"true"
    }


})



const Media = mongoose.model("uploadmedia",MediaSchema)

module.exports = Media