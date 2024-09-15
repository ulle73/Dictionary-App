import React, { useState, useContext } from "react";
import AppContext from "../context/AppContext copy";

interface SearchBarProps {
  onSearch: (input: string) => Promise<boolean>; // Ändrat för att använda en Promise som returnerar om ordet finns
}

function SearchBar({ onSearch }: SearchBarProps) {
  const {} = useContext(AppContext);

  const [inputValue, setInputValue] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value.toLowerCase());
    setErrorMessage(""); // Rensa felmeddelandet när användaren börjar skriva
  }

  async function searchFunction(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!inputValue) {
      setErrorMessage("Please type a word");
    } else {
      // Anropa onSearch och få tillbaka om ordet hittades eller inte
      const wordFound = await onSearch(inputValue);
      if (!wordFound) {
        setErrorMessage("Word not found. Please try another.");
      } else {
        setErrorMessage(""); // Rensa felmeddelandet efter en lyckad sökning
      }
    }
  }

  return (
    <div className="searchbar-container">
      <form onSubmit={searchFunction}>
        <input
          placeholder="Search for a word..."
          type="text"
          onChange={handleInputChange}
          value={inputValue}
        />
        <button type="submit">Search word</button>
      </form>

      {errorMessage && (
        <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
      )}
    </div>
  );
}

export default SearchBar;
