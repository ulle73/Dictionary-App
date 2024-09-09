import { render, screen } from '@testing-library/react';
import Searchbar from '../components/Searchbar';
import AppContext from '../context/AppContext copy';
import userEvent from '@testing-library/user-event';

test('test my searchbar function', async () => {
  const searchFunction = vi.fn(); 

  render(
    <AppContext.Provider value={{ theme: 'light' }}>
      <Searchbar onSearch={searchFunction} />
    </AppContext.Provider>
  );

  const input = screen.getByPlaceholderText('Search for a word...');
  expect(input).toBeInTheDocument();

  const user = userEvent.setup();
  await user.type(input, 'hello');

  expect(input).toHaveValue('hello');

  const button = screen.getByRole('button');
  await user.click(button);

  expect(searchFunction).toHaveBeenCalledWith('hello');
});
