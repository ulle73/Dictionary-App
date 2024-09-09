import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../components/Header';
import AppContext from '../context/AppContext copy';
import userEvent from '@testing-library/user-event';

it('Test my themeswitch', async () => {

  const mockToggleTheme = vi.fn(() => {
    const currentTheme = sessionStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    sessionStorage.setItem('theme', newTheme);
  });


  render(
    <AppContext.Provider value={{ theme: 'light', toggleTheme: mockToggleTheme }}>
      <Header title="Dictionary App" />
    </AppContext.Provider>
  );


  const toggleBtn = screen.getByText('Toggle Theme');
  expect(toggleBtn).toBeInTheDocument();


  const user = userEvent.setup();
  await user.click(toggleBtn);


  expect(sessionStorage.getItem('theme')).toBe('dark');
});
