import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import TextEditor from './TextEditor';
import { notesReducer } from './notesSlice';

// Create a mock Redux store with the notesReducer
const store = configureStore({
  reducer: {
    notes: notesReducer,
  },
});

describe('TextEditor Component', () => {
  test('renders TextEditor component without crashing', () => {
    render(
      <Provider store={store}>
        <TextEditor />
      </Provider>
    );

    // Check if the folder input field and buttons are present
    expect(screen.getByPlaceholderText('Folder Name (optional)')).toBeInTheDocument();
    expect(screen.getByText('Create Folder')).toBeInTheDocument();
    expect(screen.getByText('Save Note')).toBeInTheDocument();
  });

  test('allows folder creation', () => {
    render(
      <Provider store={store}>
        <TextEditor />
      </Provider>
    );

    const folderInput = screen.getByPlaceholderText('Folder Name (optional)');
    const createFolderButton = screen.getByText('Create Folder');

    // Enter folder name and create folder
    fireEvent.change(folderInput, { target: { value: 'Test Folder' } });
    fireEvent.click(createFolderButton);

    // Check if the folder is created (mock store should have updated state)
    expect(store.getState().notes.folders['Test Folder']).toEqual([]);
  });

  test('allows note creation', () => {
    render(
      <Provider store={store}>
        <TextEditor />
      </Provider>
    );

    const saveNoteButton = screen.getByText('Save Note');

    // Use fireEvent to simulate typing a note in ReactQuill
    const editor = screen.getByPlaceholderText('Write your note here...');
    fireEvent.focus(editor);
    fireEvent.change(editor, { target: { innerHTML: 'Test Note' } });

    // Save the note
    fireEvent.click(saveNoteButton);

    // Check if the note is added to standaloneNotes (mock store should have updated state)
    expect(store.getState().notes.standaloneNotes).toContain('Test Note');
  });

  test('displays error when trying to save an empty note', () => {
    render(
      <Provider store={store}>
        <TextEditor />
      </Provider>
    );

    const saveNoteButton = screen.getByText('Save Note');

    // Try to save an empty note
    fireEvent.click(saveNoteButton);

    // Check if error message is displayed
    expect(screen.getByText('Note content cannot be empty.')).toBeInTheDocument();
  });

  test('displays error when trying to create a folder with an empty name', () => {
    render(
      <Provider store={store}>
        <TextEditor />
      </Provider>
    );

    const createFolderButton = screen.getByText('Create Folder');

    // Try to create a folder with an empty name
    fireEvent.click(createFolderButton);

    // Check if error message is displayed
    expect(screen.getByText('Folder name cannot be empty.')).toBeInTheDocument();
  });
});
