import React, { useState } from 'react';
import axios from 'axios';
import '../styles.css';

const SQLTranslator = () => {
    const [humanLanguage, setHumanLanguage] = useState('');
    const [sql, setSql] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [prompt] = useState("Just provide the SQL query for the following request and nothing else. Provide only the SQL query without any additional formatting or explanation:")

    const API_KEY="";

    const generateSql = async (e) => {
        setIsGenerating(true);
        e.preventDefault();
        setSql("Loading your SQL... \nIt might take up to 10 seconds");
        try {
            const response = await axios({
                url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
                method: "POST",
                data: {
                    contents: [{ parts: [{ text: `${prompt} ${humanLanguage}` }] }],
                },
            });
            // setSql(response.data.candidates[0].content.parts[0].text);
            let cleanedOutput = response.data.candidates[0].content.parts[0].text;
            cleanedOutput = cleanedOutput.replace(/^```[\w-]*\n/, '').replace(/\n```$/, '');
            setSql(cleanedOutput.trim());
        } catch (error) {
            console.log(error);
            setSql("Sorry - Something went wrong. Please try again!");
        }
        setIsGenerating(false);
    };

    return (
        <div className="tool-content">
            <div className="human-language">
                <label htmlFor="humanLanguageInput">Human Language</label>
                <input
                    type="text"
                    id="humanLanguageInput"
                    value={humanLanguage}
                    onChange={(e) => setHumanLanguage(e.target.value)}
                    placeholder="e.g. show me all the cars that are red"
                />
                <br />
                <br />
                <button onClick={generateSql} disabled={isGenerating}>
                    {isGenerating ? 'Generating...' : 'Generate SQL'}
                </button>
            </div>
            <div className="sql-output">
                <label htmlFor="sqlOutput">SQL</label>
                <textarea id="sqlOutput" value={sql} readOnly></textarea>
            </div>
        </div>
    );
};

export default SQLTranslator;