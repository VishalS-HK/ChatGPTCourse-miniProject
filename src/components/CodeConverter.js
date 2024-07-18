// src/components/CodeConverter.js

// import React from 'react';
// import '../styles.css';

// const CodeConverter = () => {
//     return (
//         <div className="tool-content">
//             {/* Code Converter content here */}
//             <p>Code Converter Content</p>
//         </div>
//     );
// };

// export default CodeConverter;

import React, { useRef, useState } from 'react';
import '../style2.css';
import axios from 'axios';

const CodeConverter = () => {
    const [inputCode, setInputCode] = useState('');
    const [outputCode, setOutputCode] = useState('');
    const [targetLanguage, setTargetLanguage] = useState('Python');
    const [isConverting, setIsConverting] = useState(false);
    const languages = ['Python', 'JavaScript', 'Java', 'C++', 'Golang'];
    const outputTextareaRef=useRef(null)

    const API_KEY="";

    const convertCode = async() => {
        // This is where you'd implement the actual code conversion logic
        // For now, we'll just set a placeholder output
        setIsConverting(true);
        setOutputCode("Coverting Your code.... \nIt might take upto 10 seconds");
        try {
            const prompt = `Convert the following code to ${targetLanguage}: \n\n ${inputCode}\n\nProvide only the converted code without any further additional explanation.`
            const response = await axios({
                url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
                method: 'POST',
                data: {
                    contents: [{parts: [{ text: prompt}]}]
                },
            });
            // setOutputCode(response.data.candidates[0].content.parts[0].text);
            let cleanedOutput = response.data.candidates[0].content.parts[0].text;
            cleanedOutput = cleanedOutput.replace(/^```[\w-]*\n/, '').replace(/\n```$/, '');
            setOutputCode(cleanedOutput.trim());
        }
        catch (error){
            console.error(error);
            setOutputCode("Sorry - Something went wrong. Please try again.")
        }
        setIsConverting(false);
    };

    const copyCode = () => {
        if(outputTextareaRef.current) {
            outputTextareaRef.current.select();
            document.execCommand('copy');
            alert('Code copied');
        }
    };

    return (
        <div className="code-converter">
            <h2>Code Converter</h2>
            <div className="converter-container">
                <div className="input-section">
                    <h3>Input Code</h3>
                    <textarea
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                        placeholder="Paste your code here"
                    ></textarea>
                </div>
                <div className="controls">
                    <select 
                        value={targetLanguage} 
                        onChange={(e) => setTargetLanguage(e.target.value)}
                    >
                        {languages.map((lang) => (
                            <option key={lang.toLowerCase()} value={lang.toLowerCase()}>
                                {lang}
                            </option>
                        ))}
                    </select>
                    {/* <button onClick={convertCode}>Convert</button> */}
                    <button onClick={convertCode} disabled={isConverting}>
                        {isConverting ? 'Converting...' : 'Convert'}
                    </button>
                </div>
                <div className="output-section">
                    <h3>Converted Code</h3>
                    <textarea
                        ref={outputTextareaRef}
                        value={outputCode}
                        readOnly
                        placeholder="Converted code will appear here"
                    ></textarea>
                    <button onClick={copyCode}>Copy Code</button>
                </div>
            </div>
        </div>
    );
};

export default CodeConverter;