import React, { createContext, ReactNode, useEffect, useState } from "react";
import axios from "axios";

type ContextTypes = {
  favorites: string[];
  addFavorite: (favorite: string) => void;
  removeFavorite: (favorite: string) => void;
  theme: string;
  toggleTheme: () => void;
};

// Skapa ett nytt context för applikationen
const AppContext = createContext<ContextTypes>(null!);

// Skapa en provider-komponent som omsluter hela applikationen och delar ut state och funktioner globalt
export const AppProvider = ({ children }: { children: JSX.Element }) => {
  // -------- FAVORITORD --------
  const [favorites, setFavorites] = useState<string[]>(() => {
    // Hämta favoriter från sessionStorage vid inläsning
    const savedFavorites = sessionStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // Funktion för att uppdatera sessionStorage när favoriter ändras
  useEffect(() => {
    sessionStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  function addFavorite(favorite: string) {
    setFavorites((prevFavorites) => [...prevFavorites, favorite]);
  }

  function removeFavorite(favorite: string) {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((fav) => fav !== favorite),
    );
  }

  // -------- TEMA --------

  // Skapa en state-variabel 'theme' för att hantera applikationens tema, med standardvärde 'light'
  const [theme, setTheme] = useState("light");

  // Skapa en funktion 'toggleTheme' som växlar mellan 'light' och 'dark' tema
  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
    console.log("theme", theme);
  }

  // Använd 'useEffect' för att uppdatera dokumentets body-klass när temat ändras
  useEffect(() => {
    document.body.className = theme;
    sessionStorage.setItem("theme", theme);
  }, [theme]);

  // Props som skcikas till alla komponenter
  const props = {
    favorites,
    setFavorites,
    addFavorite,
    removeFavorite,
    theme,
    setTheme,
    toggleTheme,
  };

  return (
    // Returnera AppContext.Provider som omsluter alla child-komponenter

    <AppContext.Provider value={props}>{children}</AppContext.Provider>
  );
};

// Exportera AppContext som standardexport
export default AppContext;
