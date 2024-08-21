import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NoteState {
    folders: {
        [key: string]: string[];
    };
    standaloneNotes: string[];
}

const initialState: NoteState = {
    folders: {},
    standaloneNotes: []
};

// Load state from localStorage
const loadState = (): NoteState => {
    try {
        const serializedState = localStorage.getItem('notesState');
        if (serializedState === null) {
            return initialState;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.error("Could not load state", err);
        return initialState;
    }
};

// Save state to localStorage
const saveState = (state: NoteState) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('notesState', serializedState);
    } catch (err) {
        console.error("Could not save state", err);
    }
};

const notesSlice = createSlice({
    name: 'notes',
    initialState: loadState(),  // Initialize state with data from localStorage
    reducers: {
        addFolder: (state, action: PayloadAction<{ folderName: string }>) => {
            const { folderName } = action.payload;
            if (!state.folders[folderName]) {
                state.folders[folderName] = [];
                saveState(state);  // Save state to localStorage after modifying
            }
        },
        addNote: (state, action: PayloadAction<{ folderName?: string; note: string }>) => {
            const { folderName, note } = action.payload;
            if (folderName && note) {
                if (state.folders[folderName]) {
                    state.folders[folderName].push(note);
                } else {
                    console.error(`Folder "${folderName}" does not exist.`);
                }
            } else if (note) {
                state.standaloneNotes.push(note);
            } else {
                console.log(`Note can't be added!`);
            }
            saveState(state);  // Save state to localStorage after modifying
        }
    },
});

export const { addFolder, addNote } = notesSlice.actions;
export const notesReducer = notesSlice.reducer;
