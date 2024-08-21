# React Text Editor with Redux and ReactQuill

This is a simple React-based text editor application built with TypeScript, Redux, and ReactQuill which should be considered as a POC. The application allows users to create and manage notes, which can be organized into folders. The notes and folders persist even after a browser refresh.

## How it works?
- **Creating a Folder**:
To start, you need to create a folder. Enter the desired folder name in the "Folder Name" text field.
Click the "Create Folder" button to save the folder.

- **Adding Notes**:
Once the folder is created, you can add notes to it.
Select the folder you created from the list.
Enter your note in the "Note Content" text field.
Click the "Save Note" button to add the note to the selected folder.

- **Viewing Notes**:
Notes added to a specific folder will be listed under "Notes by Folder" for that folder.
Notes added without selecting a folder will be considered as "Standalone Notes" and will be listed separately.

## Features

- **Rich Text Editing**: Using ReactQuill, users can format text (bold, italic, underline, font size, colors, etc.).
- **Folder Organization**: Notes can be saved under specific folders or as standalone notes.
- **State Persistence**: The state of notes and folders is managed by Redux and persists across browser refreshes.
- **Error Handling**: Displays appropriate error messages if note content or folder name is empty.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **TypeScript**: Superset of JavaScript that adds static typing.
- **Redux**: State management library for React applications.
- **ReactQuill**: A Quill component for React for rich text editing.
- **Jest & React Testing Library**: For unit and integration tests.

## Getting Started

### Prerequisites

- Node.js (>= 12.x)
- npm or yarn

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/sagarsarkar/react-text-editor.git
    cd react-text-editor
    ```

2. **Install the dependencies:**

    ```bash
    npm install
    ```

    or

    ```bash
    yarn install
    ```

3. **Run the application:**

    ```bash
    npm start
    ```

    or

    ```bash
    yarn start
    ```

    The application will run on `http://localhost:3000`.

### Running Tests

To run the tests:

```bash
npm test
