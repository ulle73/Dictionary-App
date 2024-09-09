
import React from 'react';
import { render, screen } from '@testing-library/react'
import FavList from '../components/FavList';
import AppContext from '../context/AppContext copy'
import userEvent from '@testing-library/user-event';
import SearchBar from './Searchbar';

it('Test favorite words functionality' , async () => {

    const mockAddFavorite = vi.fn();
    const mockRemoveFavorite = vi.fn();
    const searchFunction = vi.fn(); 
    const favorites = ["Fav", "word"]


render(



<AppContext.Provider value={
        {favorites: favorites, addFavorite: mockAddFavorite, removeFavorite: mockRemoveFavorite}}>
      (<FavList /> <SearchBar onSearch={searchFunction}/>)

    </AppContext.Provider>
    )
    

    expect(screen.getByText("Favorite words")).toBeInTheDocument()
    const input = screen.getByPlaceholderText('Search for a word...');
  expect(input).toBeInTheDocument();

  const user = userEvent.setup();
  await user.type(input, 'hello');

  expect(input).toHaveValue('hello');

  const button = screen.getByText('Search word');
  await user.click(button);

  expect(searchFunction).toHaveBeenCalledWith('hello');



})