import React, { useEffect, useState } from 'react'

import './App.css'
import { AppProvider } from './context/AppContext copy'
import Header from './components/Header'
import SearchBar from './components/Searchbar'
import FavList from './components/FavList'
import ThemeSwitch from './components/ThemeSwitch'
import WordResult from './components/WordResult'
import axios from 'axios'
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

function App() {

  const navigate = useNavigate();

  const [wordData, setWordData] = useState<any>(null!)


  async function searchFunction(input: string) {

    try {
      // Skicka en begäran till dictionary API
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${input}`);
      console.log("SEARCHED WORD:", response.data);
      
      // Om data returneras, sätt orddata och navigera till resultatsidan
      setWordData(response.data);
      navigate(`${input}`);

    } catch (error: any) {
      // Kontrollera om det är ett 404-fel (ordet hittades inte)
      if (error.response && error.response.status === 404) {
        alert(`The word "${input}" was not found. Please try again.`);
      } else {
        // Annat fel
        console.log("Error", error);
        alert("An error occurred. Please try again.");
      }
    }
}




  return (
   
    <AppProvider>
      <div className="app-container">
        <Header title={"Dictionary App"} />
        
        <div className="main-content">
         
          <div className="content">
            <SearchBar onSearch={searchFunction} />
            
            <Routes>
              <Route path='/' element={<WordResult wordData={wordData} />} />
              <Route path='/:word' element={<WordResult wordData={wordData} />} />
            </Routes>
          </div>
        
            <FavList />
         
        </div>
      </div>
    </AppProvider>
  
  )
}

export default App
