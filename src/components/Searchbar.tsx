import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../context/AppContext copy';

interface SearchBarProps {
  onSearch: (input: string) => void;
}

function SearchBar({ onSearch } : SearchBarProps) {

  const { } = useContext(AppContext);


  // Definiera en state-variabel 'inputValue' för att hålla användarens textinmatning
  const [inputValue, setInputValue] = useState<string>("")

  // Skapa en funktion 'handleInputChange' för att uppdatera 'inputValue' varje gång användaren skriver något
  function handleInputChange(e: any) {
    setInputValue(e.target.value)
    console.log(inputValue)
  }


  // Skapa en funktion 'handleSearch' som anropas när användaren klickar på sökknappen eller trycker på enter
  function searchFunction(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log("TRYCK")

    //  - Om 'inputValue' är tomt, visa ett felmeddelande
    if (!inputValue) {
      alert("Type a word")
    } else {
      //  - Annars, anropa 'onSearch' med 'inputValue' som parameter
      onSearch(inputValue)
      console.log(inputValue)


    }

  }




  return (

    <div className="searchbar-container">
    
      <form onSubmit={searchFunction}>
        <input type="text" onChange={handleInputChange} />
        <button type='submit'>Search word</button>
      </form>
    </div>



  )

}

export default SearchBar;
