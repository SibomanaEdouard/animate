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
          borderColors={['rgb(72, 131, 131)', 'rgb(72, 131, 131)', 'rgb(30, 76, 114)', 'rgb(30, 76, 114)']} // Adjust border colors as needed
          strokeWidth={10} // Adjust the stroke width as needed
        />
      </div>
    </div>
  );
}

export default App;







