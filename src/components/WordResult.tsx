import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../context/AppContext';

function WordResult({wordData}) {

   // Kontrollera om 'wordData' finns, annars visa ett meddelande om att ingen data är tillgänglig

  // Använd 'useContext' för att få tillgång till 'favorites', 'addFavorite', och 'removeFavorite'
  const {  } = useContext(AppContext);
  // Kontrollera om ordet är en favorit och sätt en variabel 'isFavorite' baserat på detta

  return (

<div>
    <h1>WordResult</h1>
</div>

     // Returnera JSX som visar sökresultatet
    //  - Ordets huvudnamn i en <h2>
    //  - En lista med definitioner i en <ul>
    //  - En ljudspelare <audio> om ljudfilen finns
    //  - En knapp som lägger till eller tar bort ordet från favoriter beroende på 'isFavorite'
  )
}

export default WordResult;
