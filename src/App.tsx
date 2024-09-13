import React, { useState } from "react";
import "./App.css";
import { AppProvider } from "./context/AppContext copy";
import Header from "./components/Header";
import SearchBar from "./components/Searchbar";
import FavList from "./components/FavList";
import WordResult from "./components/WordResult";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [wordData, setWordData] = useState<any>(null!);
  const [globalError, setGlobalError] = useState<string>("");

  async function searchFunction(input: string): Promise<boolean> {
    try {
      // Skicka en begäran till dictionary API
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${input}`,
      );
      console.log("SEARCHED WORD:", response.data);

      // Om data returneras, sätt orddata och navigera till resultatsidan
      setWordData(response.data);
      navigate(`${input}`);
      setGlobalError(""); // Rensa globalt felmeddelande efter en lyckad sökning
      return true;
    } catch (error: any) {
      // Kontrollera om det är ett 404-fel (ordet hittades inte)
      if (error.response && error.response.status === 404) {
        setGlobalError(`The word "${input}" was not found. Please try again.`);
      } else {
        // Annat fel
        console.log("Error", error);
        setGlobalError("An error occurred. Please try again.");
      }
      return false;
    }
  }

  return (
    <AppProvider>
      <div className="app-container">
        <Header title={"Dictionary App"} />

        <div className="main-content">
          <div className="content">
            <SearchBar onSearch={searchFunction} />

            {/* Visa globalt felmeddelande om det finns något */}
            {globalError && (
              <p style={{ color: 'red', marginTop: '10px' }}>{globalError}</p>
            )}

            <Routes>
              <Route path="/" element={<WordResult wordData={wordData} />} />
              <Route path="/:word" element={<WordResult wordData={wordData} />} />
            </Routes>
          </div>

          <FavList onSearch={searchFunction} />
        </div>
      </div>
    </AppProvider>
  );
}

export default App;
