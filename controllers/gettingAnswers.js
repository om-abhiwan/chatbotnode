const {findResponse} = require("./SimiliarityLogic")

exports.getAnswerTest = async (req, res) => {
    try {
        const { question } = req.query;
        const resp = await findResponse(question);
        let data = ""

        let noResult = "I'm sorry, I didn't understand that."
        if(resp==="I'm sorry, I didn't understand that."){
            return res.status(200).json({response:noResult,data:data})
        }

        console.log(resp)

        return res.status(200).json({response:resp.answers,data:data})
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
};
