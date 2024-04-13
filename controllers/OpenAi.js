const openAi = require("openai")

const openai = new openAi({
    apiKey:process.env.API_KEY
})


const getResponse = async(question) =>{
    const resp = await openai.chat.completions.create({
        model:"gpt-3.5-turbo",
        messages:[{"role":"user","content":question}],
        max_tokens:2000
    })
    return resp.choices[0].message.content
}

module.exports = getResponse