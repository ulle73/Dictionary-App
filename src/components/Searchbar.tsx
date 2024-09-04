import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../context/AppContext';

function SearchBar() {

    const {  } = useContext(AppContext);


 // Definiera en state-variabel 'inputValue' för att hålla användarens textinmatning
 const [inputValue, setInputvalue] = useState("")

  // Skapa en funktion 'handleInputChange' för att uppdatera 'inputValue' varje gång användaren skriver något
  function handleInputChange(e){
setInputvalue(e.target.value)
console.log(inputValue)
  }


  // Skapa en funktion 'handleSearch' som anropas när användaren klickar på sökknappen eller trycker på enter
function handleSearch(e){
e.preventDefault()
console.log("TRYCK")

//  - Om 'inputValue' är tomt, visa ett felmeddelande
if(!inputValue){
    alert("Type a word")
} else{
     //  - Annars, anropa 'onSearch' med 'inputValue' som parameter och nollställ 'inputValue'
    console.log(inputValue)
    //setInputValue("")
}

}


  

  return (

    <div>
    <h1>SearchBar</h1>
    <form onSubmit={handleSearch}>
        <input type="text" onChange={handleInputChange}/>
        <button type='submit'>Search word</button>
    </form>
</div>
         
    // Returnera JSX som bygger upp komponentens struktur
    //  - En <form> med en textinmatning <input> bunden till 'inputValue' och 'handleInputChange'
    //  - En sökknapp <button> som anropar 'handleSearch' när den klickas på
  
 
  )

}

export default SearchBar;
