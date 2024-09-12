import { render, screen, cleanup , within} from '@testing-library/react'
import App from '../App';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe } from 'vitest';
import userEvent from '@testing-library/user-event';




const user = userEvent.setup()


  describe('App', () => {
    beforeEach(() => {
      render(
        <Router>
           <App />
         </Router>)
    })


    afterEach(() => {
      cleanup()
    })

    
    // Rendera alla komponenter
    it('should render all main components', () => {
  
      
      expect(screen.getByText('Dictionary App')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toBeInTheDocument();
      expect(screen.getByText('Search word')).toBeInTheDocument();
      expect(screen.getByText('Favorite words')).toBeInTheDocument();
      expect(screen.getByText('Toggle Theme')).toBeInTheDocument();
    });



    // Lägg till/ta bort från favoriter
    it('should add/remove words from favorites', async () => {

   

      await user.type(screen.getByPlaceholderText('Search for a word...'), 'example');
      await user.click(screen.getByRole('button', { name: /Search word/i }));

      expect(await screen.findByText('example')).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Add word to Favorites' }));


      const favList = screen.getByLabelText("Favorite words")
      expect(within(favList).getByText("example")).toBeInTheDocument()
   


    })

  });
  




  

