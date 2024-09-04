import React, { useState } from 'react'

import './App.css'
import { AppProvider } from './context/AppContext copy'
import Header from './components/Header'
import SearchBar from './components/Searchbar'
import FavList from './components/FavList'
import ThemeSwitch from './components/ThemeSwitch'
import WordResult from './components/WordResult'

function App() {


  return (
    <AppProvider>
      <div>

        <Header title={"Dictionary App"}/>
        <FavList />
        <SearchBar />
        <ThemeSwitch />
        <WordResult wordData={}/>

      </div>
    </AppProvider>
  )
}

export default App
