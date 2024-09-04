import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../context/AppContext copy';





function FavList() {


// Använd 'useContext' för att få tillgång till 'favorites' och 'removeFavorite'
 const { favorites, removeFavorite } = useContext(AppContext);


  return (

<div className="favList-container text-center">
    <h2>Favorite words</h2>
    <ul>
      {favorites.map((word: string, index: number) => (
        <li key={index}>
          {word} <button className="remove-btn" onClick={() => removeFavorite(word)}>Remove</button>
        </li>
      ))}
    </ul>
</div>
    
   
 
)
}

export default FavList;
