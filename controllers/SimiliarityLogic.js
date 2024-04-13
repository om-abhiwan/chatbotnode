const { DataModel } = require("../models/uploadDataSchema");
const getResponse = require("./OpenAi");

// Function to calculate string similarity using cosine similarity
function calculateSimilarity(str1, str2) {
    const words1 = str1.toLowerCase().split(/[^\w]+/).filter(Boolean);
    const words2 = str2.toLowerCase().split(/[^\w]+/).filter(Boolean);

    const wordCount1 = {};
    const wordCount2 = {};

    // Count word occurrences in str1
    for (const word of words1) {
        wordCount1[word] = (wordCount1[word] || 0) + 1;
    }
    // Count word occurrences in str2
    for (const word of words2) {
        wordCount2[word] = (wordCount2[word] || 0) + 1;
    }
    const dotProduct = Object.keys(wordCount1).reduce((acc, word) => {
        return acc + (wordCount1[word] * (wordCount2[word] || 0));
    }, 0);
    const magnitude1 = Math.sqrt(Object.keys(wordCount1).reduce((acc, word) => {
        return acc + Math.pow(wordCount1[word], 2);
    }, 0));
    const magnitude2 = Math.sqrt(Object.keys(wordCount2).reduce((acc, word) => {
        return acc + Math.pow(wordCount2[word], 2);
    }, 0));
    if (magnitude1 === 0 || magnitude2 === 0) {
        return 0;
    }
    return dotProduct / (magnitude1 * magnitude2);
}

// Function to find the best response based on user input similarity
exports.findResponse  = async(userInput) =>{

    const question = userInput.toLowerCase();
    const data = await DataModel.find({}); // Fetch questions from database
    // console.log(data)
    let bestMatch = null;
    let maxSimilarity = 0;
    
    for (const item of data) {
        const similarity = calculateSimilarity(question, item.question.toLowerCase());
        if (similarity > maxSimilarity) {
            maxSimilarity = similarity;
            bestMatch = item;
        }
    }
    
    const SIMILARITY_THRESHOLD = 0.85;
    
    if (maxSimilarity >= SIMILARITY_THRESHOLD && bestMatch) {
        return bestMatch;
    } else {
        let aiResp = await getResponse(userInput)
        console.log(aiResp)
        return aiResp;
    }
}