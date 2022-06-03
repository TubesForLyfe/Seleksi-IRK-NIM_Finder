import React from "react";

import RouteManager from './route.js';
import './App.css';

function App() {
  document.title = "NIM Finder"
  return (
    <div className="App">
      <RouteManager />
    </div>
  );
}

export default App;