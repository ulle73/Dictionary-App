import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../context/AppContext copy';
import { useParams } from 'react-router-dom'

function WordResult({wordData}:any)  {

  const { word } = useParams()
  

  // Använd 'useContext' för att få tillgång till 'favorites', 'addFavorite', och 'removeFavorite'
  const { favorites , addFavorite, removeFavorite  }  = useContext(AppContext);
  
  // Kontrollera om ordet är en favorit och sätt en variabel 'isFavorite' baserat på detta
  const isFavorite = favorites.includes(wordData?.[0]?.word);

  if (!wordData || wordData[0]?.word !== word) {
    return <div></div>;
  }

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavorite(wordData[0].word);
    } else {
      addFavorite(wordData[0].word);
    }
  };





  return (
    <div className="wordResult-container">

        {/* Ordets huvudnamn i en  */}
      <h2>{wordData[0].word}</h2>

      {/* En knapp som lägger till eller tar bort ordet från favoriter beroende på 'isFavorite' */}
      <button 
        className={`button ${isFavorite ? 'remove-from-favorites' : 'add-to-favorites'}`} 
        onClick={handleFavoriteClick}
      >
        {isFavorite ? "Remove word from Favorites" : "Add word to Favorites"}
      </button>


      {/* En lista med definitioner i en <ul> */}
      <ul>
        {wordData[0].meanings.map((meaning: any, index: number) => (
          <li key={index}>
            <strong>{meaning.partOfSpeech}:</strong> {meaning.definitions[0].definition}
          </li>
        ))}
      </ul>

      {/* En ljudspelare <audio> om ljudfilen finns */}
      {wordData[0].phonetics[0]?.audio && (
        <audio controls>
          <source src={wordData[0].phonetics[0].audio} type="audio/mpeg" />
        </audio>
      )}
    </div>
  );
}

export default WordResult;