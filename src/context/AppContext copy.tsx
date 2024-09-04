import React, { createContext, ReactNode, useEffect, useState } from 'react';
import axios from "axios"


type ContextTypes = {

    favorites: string[];
    addFavorite: (favorite: string) => void;
    removeFavorite: (favorite: string) => void;
    theme: string;
    toggleTheme: () => void;



}

// Skapa ett nytt context för applikationen
const AppContext = createContext<ContextTypes>(null!);

// Skapa en provider-komponent som omsluter hela applikationen och delar ut state och funktioner globalt
export const AppProvider = ({ children }: { children: JSX.Element }) => {







    // -------- FAVORITORD --------

    // Skapa en state-variabel 'favorites' för att lagra en lista över favoritord
    const [favorites, setFavorites] = useState<string[]>([])

    // Skapa en funktion 'addFavorite' som lägger till ett ord i 'favorites'
    function addFavorite(favorite: string) {
        setFavorites([...favorites, favorite])
    }

    // Skapa en funktion 'removeFavorite' som tar bort ett ord från 'favorites'
    function removeFavorite(favorite: string) {
        setFavorites(favorites.filter((fav) => fav !== favorite))

    }

    // -------- TEMA --------

    // Skapa en state-variabel 'theme' för att hantera applikationens tema, med standardvärde 'light'
    const [theme, setTheme] = useState('light')

    // Skapa en funktion 'toggleTheme' som växlar mellan 'light' och 'dark' tema
    function toggleTheme() {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    // Använd 'useEffect' för att uppdatera dokumentets body-klass när temat ändras



    // Props som skcikas till alla komponenter 
    const props = {
        favorites,
        setFavorites,
        addFavorite,
        removeFavorite,
        theme,
        setTheme,
        toggleTheme,
    }




    return (
        // Returnera AppContext.Provider som omsluter alla child-komponenter

        <AppContext.Provider value={
            props}>
            {children}
        </AppContext.Provider>
    );
};



// Exportera AppContext som standardexport
export default AppContext;
