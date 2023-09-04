import './App.css'
import React from 'react';
import BouncingAndRotatingPuzzlePiece from './components/BouncingAndRotatingPuzzlePiece'; // Update the import path

function App() {
  return (
    <div className="App container">
      <div className="puzzle-container">
        <BouncingAndRotatingPuzzlePiece
          width={180} // Adjust the width as needed
          height={180} // Adjust the height as needed
          strokeWidth={10} 
          padding={5}
        />
      </div>
    </div>
  );
}

export default App;








