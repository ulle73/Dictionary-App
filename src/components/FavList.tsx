import React, { useContext } from "react";
import AppContext from "../context/AppContext copy";

function FavList({ onSearch }: { onSearch: (word: string) => void }) {
  const { favorites, removeFavorite } = useContext(AppContext);

  return (
    <div className="favList-container text-center">
      <h2>Favorite words</h2>
      <ul aria-label="Favorite words">
        {favorites.map((word: string, index: number) => (
          <li className="list" key={index}>
            {/* Anropa onSearch istället för att länka */}
            <span className="favorite-word" onClick={() => onSearch(word)}>
              {word}
            </span>{" "}
            <button className="remove-btn" onClick={() => removeFavorite(word)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FavList;
