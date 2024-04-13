const UploadMedia = require("../models/uploadMediaSchema");
const { findResponse } = require("./SimiliarityLogic");


exports.getAnswerTest = async (req, res) => {
    try {
        const { question } = req.query;
        // caliing to check the similarity 
        const resp = await findResponse(question);

        let data = ""



            try{
                // if user has media like img, video and pdf
                const media = await UploadMedia.find({ question_id: resp._id.toString() }).select({ categories: 1, link: 1, _id: 0 })
                if (media.length != 0) {
                    data = media
                }
                
            }catch(err){
                let aiResult = resp  
                return res.status(200).json({ response: aiResult, data: data })
            }
            

        return res.status(200).json({ response: resp.answers, data: data })
    
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
};

