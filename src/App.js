import './App.css'
import React from 'react';
import BouncingAndRotatingPuzzlePiece from './components/BouncingAndRotatingPuzzlePiece'; // Update the import path

function App() {
  return (
    <div className="App container">
      <div className="puzzle-container">
        <BouncingAndRotatingPuzzlePiece
          width={200} // Adjust the width as needed
          height={200} // Adjust the height as needed
          strokeWidth={10} 
          padding={10}
        />
      </div>
    </div>
  );
}

export default App;








