import { useState, useEffect, useContext } from "react";
import AppContext from "../context/AppContext copy";
import { useParams } from "react-router-dom";

function WordResult({ wordData }: any) {
  const { word } = useParams();

  // Använd 'useContext' för att få tillgång till 'favorites', 'addFavorite', och 'removeFavorite'
  const { favorites, addFavorite, removeFavorite } = useContext(AppContext);

  // Kontrollera om ordet är en favorit och sätt en variabel 'isFavorite' baserat på detta
  const isFavorite = favorites.includes(wordData?.[0]?.word);

  // Sätt ljudfilen i state
  const [audioSrc, setAudioSrc] = useState<string | null>(null);

  // Använd useEffect för att uppdatera ljudfilen varje gång ett nytt ord laddas
  useEffect(() => {
    if (wordData && wordData[0]?.phonetics[0]?.audio) {
      setAudioSrc(wordData[0].phonetics[0].audio);
    } else {
      setAudioSrc(null);
    }
  }, [wordData]);

  // Om det nya ordet inte matchar det nuvarande, returnera en tom div
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
      {/* Ordets huvudnamn */}
      <h2 data-testid="word-heading">{wordData[0].word}</h2>

      {/* Knapp för att lägga till eller ta bort ordet från favoriter */}
      <button
        className={`button ${isFavorite ? "remove-from-favorites" : "add-to-favorites"}`}
        onClick={handleFavoriteClick}
      >
        {isFavorite ? "Remove word from Favorites" : "Add word to Favorites"}
      </button>

      {/* Lista med definitioner */}
      <ul>
        {wordData[0].meanings.map((meaning: any, index: number) => (
          <li key={index}>
            <strong>{meaning.partOfSpeech}:</strong>{" "}
            {meaning.definitions[0].definition}
          </li>
        ))}
      </ul>

      {/* Ljudspelare*/}
      {audioSrc && (
        <audio key={audioSrc} controls>
          <source data-testid="audio-file" src={audioSrc} type="audio/mpeg" />
        </audio>
      )}
    </div>
  );
}

export default WordResult;
