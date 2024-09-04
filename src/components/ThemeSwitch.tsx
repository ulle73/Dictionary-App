import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../context/AppContext copy';

function ThemeSwitch() {


  // Använd 'useContext' för att få tillgång till 'theme' och 'toggleTheme'
  const { theme, toggleTheme } = useContext(AppContext);

  return (
    <div className="themeSwitch-container">
    
        <h1>ThemeSwitch</h1>
     
      <div>
        <button onClick={() => toggleTheme()}>Toggle Theme</button>
      </div>
    </div>

    // Returnera JSX med en knapp som visar det aktuella temat
    //  - Knappen ska växla mellan 'light' och 'dark' tema när den klickas

  )
}

export default ThemeSwitch;
