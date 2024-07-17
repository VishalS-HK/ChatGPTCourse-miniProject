// src/geminiApi.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generateSqlFromPrompt = async (prompt) => {
    try {
        const result = await model.generateContent(prompt);
        console.log("Result from API:", result);
        
        if (result && result.response && result.response.text) {
            const text = await result.response.text();
            console.log("Generated SQL:", text);
            return text;
        } else {
            console.error("Invalid response structure:", result);
            throw new Error("Invalid response structure");
        }
    } catch (error) {
        console.error("Error generating SQL:", error);
        throw error;
    }
};

module.exports = {
    generateSqlFromPrompt
};
