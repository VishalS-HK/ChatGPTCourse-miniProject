import React, { useState } from 'react';
import axios from 'axios';
import '../style4.css';

const WireframeToCode = () => {
    const [image, setImage] = useState(null);
    const [htmlCode, setHtmlCode] = useState('');
    const [cssCode, setCssCode] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [prompt] = useState("Generate HTML and CSS code for this wireframe image. Provide the HTML and CSS separately, starting with 'HTML:' and 'CSS:' respectively. Do not include any other text or explanations.");

    const API_KEY="";


    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const generateCode = async (e) => {
        e.preventDefault();
        if (!image) return;

        setIsGenerating(true);
        setHtmlCode("Generating HTML...");
        setCssCode("Generating CSS...");

        try {
            const base64Image = await fileToBase64(image);
            const response = await axios({
                url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=${API_KEY}`,
                method: "POST",
                data: {
                    contents: [
                        {
                            parts: [
                                { text: prompt },
                                {
                                    inline_data: {
                                        mime_type: image.type,
                                        data: base64Image
                                    }
                                }
                            ]
                        }
                    ],
                },
            });

            const generatedText = response.data.candidates[0].content.parts[0].text;
            const [htmlPart, cssPart] = generatedText.split('CSS:');
            setHtmlCode(htmlPart.replace('HTML:', '').trim());
            setCssCode(cssPart.trim());
        } catch (error) {
            console.error("Error generating code:", error);
            setHtmlCode("Error generating HTML code.");
            setCssCode("Error generating CSS code.");
        }
        setIsGenerating(false);
    };

    const fileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = error => reject(error);
        });
    };

    const copyCode = (type) => {
        const text = type === 'html' ? htmlCode : cssCode;
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="wireframe-to-code-converter">
            <h2>Wireframe to Code Converter</h2>
            <div className="converter-container">
                <div className="input-section">
                    <h3>Input Wireframe Image</h3>
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    <button onClick={generateCode} disabled={!image || isGenerating}>
                        {isGenerating ? 'Generating...' : 'Generate Code'}
                    </button>
                    {image && <img src={URL.createObjectURL(image)} alt="Wireframe preview" className="image-preview" />}
                </div>

                <div className="code-output">
                    <h3>HTML Code</h3>
                    <textarea
                        value={htmlCode}
                        readOnly
                        placeholder="Generated HTML will appear here"
                    ></textarea>
                    <button onClick={() => copyCode('html')}>Copy HTML</button>
                </div>

                <div className="code-output">
                    <h3>CSS Code</h3>
                    <textarea
                        value={cssCode}
                        readOnly
                        placeholder="Generated CSS will appear here"
                    ></textarea>
                    <button onClick={() => copyCode('css')}>Copy CSS</button>
                </div>
            </div>
        </div>
    );
};

export default WireframeToCode;