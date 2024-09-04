import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../context/AppContext copy';

function ThemeSwitch() {


  // Använd 'useContext' för att få tillgång till 'theme' och 'toggleTheme'
  const { theme, toggleTheme } = useContext(AppContext);

  return (
    <div className="themeSwitch-container">
    
     
        <button onClick={() => toggleTheme()}>Toggle Theme</button>
      
    </div>



  )
}

export default ThemeSwitch;
