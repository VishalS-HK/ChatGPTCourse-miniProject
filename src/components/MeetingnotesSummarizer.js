// // src/components/MeetingnotesSummarizer.js

// import React from "react";
// import '../styles.css';

// const MeetingnotesSummarizer = () => {
//     return (
//         <div className="tool-content">
//             {/* Code Converter content here */}
//             <p>Meeting notes Summarizer</p>
//         </div>
//     );
// };

// export default MeetingnotesSummarizer;

import React, { useRef, useState } from "react";
import axios from 'axios';
import '../style3.css'


const MeetingnotesSummarizer = () => {
    const [meetingNotes, setMeetingNotes] = useState('');
    const [outputSummary, setOutputSummary] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [prompt] = useState("You will be provided with meeting notes, and your task is to summarize the meeting as follows:\n    \n    -Overall summary of discussion\n    -Action items (what needs to be done and who is doing it)\n    -If applicable, a list of topics that need to be discussed more fully in the next meeting.");
    const outputSummaryRef = useRef(null)

    const API_KEY = "";

    const generateMeetingNotesSummr = async (e) => {
        setIsGenerating(true);
        e.preventDefault();
        setOutputSummary("Loading your meeting Summary.... \n It might take upto 10 seconds");
        try {
            const response = await axios({
                url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
                method: 'POST',
                data: {
                    contents: [{parts: [{text: `${prompt} ${meetingNotes}`}]} ],
                },
            });
            setOutputSummary(response.data.candidates[0].content.parts[0].text);
        }
        catch (error){
            console.log(error);
            setOutputSummary("Sorry - Something went wrong. Please try again!");
        }
        setIsGenerating(false);
    };

    const copySummary = () => {
        if(outputSummaryRef.current) {
            outputSummaryRef.current.select();
            document.execCommand('copy');
            alert('Summary copied');
        }
    }

    return(
        <div className="notes-summary-converter">
            <h2>Meeting notes Summarizer</h2>
            <div className="summarizer">
                <div className="input-section">
                    <h3>Input Meeting Notes</h3>
                    <textarea
                        value={meetingNotes}
                        onChange={(e) => setMeetingNotes(e.target.value)}
                        placeholder="Paste the meeting code here"
                    ></textarea>
                    <button onClick={generateMeetingNotesSummr} disabled={isGenerating}>
                        {isGenerating ? 'Generating...' : 'Generate'}
                    </button>
                </div>

                <div className="output-section">
                    <h3>Output Summary</h3>
                    <textarea
                        ref={outputSummaryRef}
                        value={outputSummary}
                        readOnly
                        placeholder="Meeting notes summary will appear here"
                    ></textarea>
                    <button onClick={copySummary}>Copy Summary</button>
                </div>
            </div>
        </div>
    );
};

export default MeetingnotesSummarizer;