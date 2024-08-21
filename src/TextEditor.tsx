import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { addNote, addFolder } from './notesSlice';
import { RootState } from './store';
import './TextEditor.css';

interface TextEditorProps {}

interface TextEditorComponent extends React.FC<TextEditorProps> {
    modules?: any;
    formats?: any;
}

const TextEditor: TextEditorComponent = () => {
    const [content, setContent] = useState<string>('');
    const [folderName, setFolderName] = useState<string>('');
    const [folderError, setFolderError] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();
    const folders = useSelector((state: RootState) => state.notes.folders);
    const standaloneNotes = useSelector((state: RootState) => state.notes.standaloneNotes);

    const handleSaveNote = () => {
        if (!content.trim()) { // Check if content is empty
            setError('Note content cannot be empty.');
            return;
        }
        dispatch(addNote({ folderName: folderName || undefined, note: content }));
        setContent('');
        if (folderName) {
            setFolderName('');
        }
    };

    const handleCreateFolder = () => {
        if (!folderName.trim()) { // Check if content is empty
            setFolderError('Folder name cannot be empty.');
            return;
        }
        dispatch(addFolder({ folderName }));
        setFolderName('');
    };

    return (
        <div className="text-editor-container">
            <div className="folder-section">
                <input
                    type="text"
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                    placeholder="Folder Name (optional)"
                    className="folder-input"
                />
                {folderError && <div className="error-message">{folderError}</div>}
                <button onClick={handleCreateFolder}  className="folder-button">Create Folder</button>
                
            </div>
            <div className="editor-section">
                <ReactQuill
                    value={content}
                    onChange={setContent}
                    placeholder="Write your note here..."
                    modules={TextEditor.modules}
                    formats={TextEditor.formats}
                    className="quill-editor"
                    data-testid="quill-editor"
                />
                {error && <div className="error-message">{error}</div>}
                <button onClick={handleSaveNote} className="save-button">Save Note</button>
                
            </div>
            <div className="notes-section">
                <h2>Saved Notes</h2>
                {standaloneNotes.length > 0 && (
                    <div className="standalone-notes">
                        <h3>Standalone Notes</h3>
                        <ul>
                            {standaloneNotes.map((note, index) => (
                                <li key={index} dangerouslySetInnerHTML={{ __html: note }} />
                            ))}
                        </ul>
                    </div>
                )}
                {Object.keys(folders).length > 0 && (
                    <div className="foldered-notes">
                        <h3>Notes by Folder</h3>
                {Object.keys(folders).map((folder) => (
                    <div key={folder} className="folder">
                        <h3>Folder: '{folder}'</h3>
                        <ul>
                            {folders[folder].map((note, index) => (
                                <li key={index} dangerouslySetInnerHTML={{ __html: note }} />
                            ))}
                        </ul>
                    </div>
                ))}
                </div>
            )}
            </div>
        </div>
    );
};

// Attach static properties to the component
TextEditor.modules = {
    toolbar: [
        [{ 'font': [] }],
        [{ 'header': '1' }, { 'header': '2' }, { 'header': [3, 4, 5, 6] }, { 'font': [] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],
        ['link', 'image'],
        ['clean'],
    ],
};

TextEditor.formats = [
    'header', 'font',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'color', 'background', 'align',
];

export default TextEditor;
