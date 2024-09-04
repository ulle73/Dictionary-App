import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../context/AppContext';

function ThemeSwitch() {


  // Använd 'useContext' för att få tillgång till 'theme' och 'toggleTheme'
  const {  } = useContext(AppContext);

  return (
 
<div>
    <h1>ThemeSwitch</h1>
</div>

  // Returnera JSX med en knapp som visar det aktuella temat
    //  - Knappen ska växla mellan 'light' och 'dark' tema när den klickas

  )
}

export default ThemeSwitch;
