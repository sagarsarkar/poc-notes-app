import React from 'react';
import TextEditor from './TextEditor';
import './App.css';

const App: React.FC = () => {
    return (
        <div className="app-container">
            <header className="app-header">
                <h1>My Notes Application</h1>
            </header>
            <div className="app-content">
                <TextEditor />
            </div>
            <footer className="app-footer">
                &copy; 2024 My Notes App. All rights reserved.
            </footer>
        </div>
    );
};

export default App;
