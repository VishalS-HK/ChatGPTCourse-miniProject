// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

const Header = () => {
    return (
        <header>
            <div className="header-content">
                <h1>DevTools🛠️</h1>
                <nav>
                    <Link to="/sql-translator">SQL Translator</Link>
                    <Link to="/code-converter">Code Converter</Link>
                    <Link to="/meeting-summary">Meeting notes Summarizer</Link>
                    <Link to="/interview-question">Interview Questions</Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
