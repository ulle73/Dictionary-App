import React from 'react';


type HeaderProps = {
    title:string;
  
    }

function Header({title}:HeaderProps) {





    return (
      <header className="header-container text-center">
        <h1>{title}</h1>
      </header>
    );
  }
  
  export default Header;