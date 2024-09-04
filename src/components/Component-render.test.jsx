import { render, screen } from '@testing-library/react'
import App from '../App';





it.todo('should render all main components', () => {
    render(<App />);
    
    expect(screen.getByText('Dictionary App')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText('Search word')).toBeInTheDocument();
    expect(screen.getByText('FavList')).toBeInTheDocument();
    expect(screen.getByText('Toggle Theme')).toBeInTheDocument();
  });
  