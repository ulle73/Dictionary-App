

import { render, screen } from '@testing-library/react'
import Header from '../components/Header';
import AppContext from '../context/AppContext copy'

it("See my header" , () => {
render(

<AppContext.Provider value={
        {theme:"light"}}>
      (<Header title={"Dictionary App"}/>)
    </AppContext.Provider>
    )
    

    expect(screen.getByText("Dictionary App")).toBeInTheDocument()
})