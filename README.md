# Basic Tauri + Vue 3 Project
- There are two pages: Home and Search
#### Home Page
- A simple form that takes a name input
- A button that triggers a call to the Rust backend
- Display area for the response from the backend
- Theme toggle switcher
#### Search Page
- The component performs a search through an array of names stored in a separate Pinia store
- Search results are displayed in real-time. If no matches are found, the message "No results found." is shown
- Clear input button: A cross (×) appears when the input field contains one or more characters, allowing users to clear the input
- Overlay interaction: When the search input is active, the rest of the interface is covered by an overlay
- Click-outside logic: The suggestions dropdown collapses when clicking outside the component. This logic is extracted into a reusable composable
- Theme switcher: Added a theme toggle (light/dark) based on CSS variables


## Project Structure

- `src/` - Contains Vue 3 frontend code
  - `App.vue` - Main Vue component with UI and frontend logic
  - `main.js` - Vue application entry point
  - `assets/` - Static assets like images

- `src-tauri/` - Contains Rust backend code
  - `src/lib.rs` - Core Rust functionality and Tauri command definitions
  - `src/main.rs` - Rust application entry point
  - `Cargo.toml` - Rust dependencies configuration
  - `tauri.conf.json` - Tauri configuration

## Setup and Installation

1. Clone or download this repository
2. Navigate to the project directory:
   ```
   cd basic
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Running the Application

To run the application in development mode:

```
npm run tauri dev
```

This will start both the Vue frontend and Tauri backend, and open the application in a native window.
