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

  const [wordData, setWordData] = useState<any>(null)


  async function searchFunction(input: string) {

    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${input}`)
      console.log("SEARCHED WORD:", response.data)
      setWordData(response.data)
      navigate(`${input}`)

    } catch (error) {

      console.log("Error", error)
    }

  }





  return (
    <AppProvider>
      <div>

        <Header title={"Dictionary App"} />

        <Routes>

          <Route path='/' element={
            <>
              
                 <FavList />
            

              <SearchBar onSearch={searchFunction} />
              <ThemeSwitch />
              <WordResult wordData={wordData} />
            </>
          }>

          </Route>

          <Route path="/:word" element={<WordResult wordData={wordData} />} />

        </Routes>

      </div>
    </AppProvider>
  )
}

export default App
