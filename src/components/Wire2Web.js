import React, {useState} from 'react';
import axios from 'axios';
import '../style4.css';

const Wireframe2Web = () => {
    return (
        <div className='wire-2-code-converter'>
            <h2>Wireframe to Code</h2>
            <div className='converter-container'>
                <div className='input-section'></div>
                <div className='output-section'></div>
            </div>
        </div>
    );
};

export default Wireframe2Web