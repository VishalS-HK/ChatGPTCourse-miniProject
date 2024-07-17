// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload. 
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SQLTranslator from './components/SQLTranslator';
import CodeConverter from './components/CodeConverter';
import InterviewQuestions from './components/InterviewQuestions';
import MeetingnotesSummarizer from './components/MeetingnotesSummarizer';
import './styles.css';


const App = () => {
    return (
        <Router>
            <Header />
            <main id="mainContent">
                <Routes>
                    <Route path="/sql-translator" element={<SQLTranslator />} />
                    <Route path="/code-converter" element={<CodeConverter />} />
                    <Route path="/interview-question" element={<InterviewQuestions />} />
                    <Route path="/meeting-summary" element={<MeetingnotesSummarizer />} />
                    <Route path="/" element={<p>Select a tool from the navigation above to get started.</p>} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
};

export default App;

