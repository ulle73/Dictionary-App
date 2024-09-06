import { render, screen } from '@testing-library/react'
import App from '../App';
import { BrowserRouter as Router } from 'react-router-dom';





it('should render all main components', () => {
    render(
   <Router>
      <App />
    </Router>);
    
    expect(screen.getByText('Dictionary App')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByText('Search word')).toBeInTheDocument();
    expect(screen.getByText('Favorite words')).toBeInTheDocument();
    expect(screen.getByText('Toggle Theme')).toBeInTheDocument();
  });
  