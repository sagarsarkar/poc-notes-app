import { configureStore } from '@reduxjs/toolkit';
import { notesReducer, addNote, addFolder } from './notesSlice';

// Helper function to create a store with the notes reducer
const createTestStore = () => configureStore({
  reducer: {
    notes: notesReducer,
  },
});

describe('notesSlice', () => {
  test('should handle adding a folder', () => {
    const store = createTestStore();
    const initialState = store.getState().notes;

    store.dispatch(addFolder({ folderName: 'New Folder' }));

    const state = store.getState().notes;
    expect(state.folders).toHaveProperty('New Folder');
    expect(state.folders['New Folder']).toEqual([]);
  });

  test('should handle adding a note to a folder', () => {
    const store = createTestStore();
    store.dispatch(addFolder({ folderName: 'Existing Folder' }));
    const initialState = store.getState().notes;

    store.dispatch(addNote({ folderName: 'Existing Folder', note: '<p>Note in folder</p>' }));

    const state = store.getState().notes;
    expect(state.folders['Existing Folder']).toContain('<p>Note in folder</p>');
  });

  test('should handle adding a standalone note', () => {
    const store = createTestStore();
    const initialState = store.getState().notes;

    store.dispatch(addNote({ note: '<p>Standalone Note</p>' }));

    const state = store.getState().notes;
    expect(state.standaloneNotes).toContain('<p>Standalone Note</p>');
  });

  test('should not add a note if content is empty', () => {
    const store = createTestStore();

    store.dispatch(addNote({ note: '' }));

    const state = store.getState().notes;
    expect(state.standaloneNotes).not.toContain('');
  });
});
