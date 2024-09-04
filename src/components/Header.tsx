import React from 'react';
import ThemeSwitch from './ThemeSwitch';


type HeaderProps = {
    title:string;
  
    }

function Header({title}:HeaderProps) {





    return (
      <header className="header-container text-center">
          <ThemeSwitch />
        <h1>{title}</h1>
      
      </header>
    );
  }
  
  export default Header;