import React, { useState, useEffect, useContext } from 'react';
import AppContext from '../context/AppContext copy';





function FavList() {


// Använd 'useContext' för att få tillgång till 'favorites' och 'removeFavorite'
 const { favorites, removeFavorite } = useContext(AppContext);


  return (

<div>
    <h1>FavList</h1>
</div>
    
   // Returnera JSX som visar en lista över favoritord
    //  - Om 'favorites' har ord, visa dem i en <ul> med en borttagningsknapp för varje ord
    //  - Om inga favoriter finns, visa ett meddelande
 
)
}

export default FavList;
