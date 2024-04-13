const { DataModel } = require("../models/uploadDataSchema");
const UploadMedia = require("../models/uploadMediaSchema");
const { findResponse } = require("./SimiliarityLogic");
const getResponse = require("./OpenAi");

exports.getAnswerTest = async (req, res) => {
    try {
        const { question } = req.query;
        // caliing to check the similarity 
        const resp = await findResponse(question);

        let data = ""



        try {
            // if user has media like img, video and pdf
            const media = await UploadMedia.find({ question_id: resp._id.toString() }).select({ categories: 1, link: 1, _id: 0 })
            if (media.length != 0) {
                data = media
            }

        } catch (err) {
            let aiResult = resp
            return res.status(200).json({ response: aiResult, data: data })
        }


        return res.status(200).json({ response: resp.answers, data: data })

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
};


exports.getAns = async (req, res) => {
    const { userInput } = req.body;

    const userInputLower = userInput.toLowerCase().trim();

    console.log("\n---------------------------------------------\n", userInput)

    try {
        // Check if DataModel is properly imported and defined
        if (DataModel) {



            const results = await DataModel.find({ $text: { $search: userInputLower } },
                { score: { $meta: 'textScore' } }
            ).sort({ score: { $meta: 'textScore' } });

            if (results.length > 0) {


                const bestMatch = results[0];



                let data = ""

                try {
                    const media = await UploadMedia.find({ question_id: bestMatch._id.toString() }).select({ categories: 1, link: 1, _id: 0 })
                    if (media.length != 0) {
                        data = media
                    }
                } catch (err) {
                    let aiResult = resp
                    return res.status(200).json({ response: aiResult, data: data })
                }






                return res.status(200).json({ response: bestMatch.answers, data: data })



























                // Process bestMatch or return the result as needed

                // res.status(200).json({ data: bestMatch })





            } else {
                let aiResp = await getResponse(userInput)
                return res.status(200).json({ msg: aiResp });
            }



        } else {
            throw new Error('DataModel is not defined or imported correctly.');
        }
    } catch (error) {
        console.error('Error finding response:', error);
    }
};


exports.allAns = async (req, res) => {

    try {

        const resp = await DataModel.find({})
        return res.send({ data: resp })

    } catch (err) {
        return res.status(400).json({ error: "err" })
    }

}