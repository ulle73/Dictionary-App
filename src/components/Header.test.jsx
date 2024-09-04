

import { render, screen } from '@testing-library/react'
import Header from '../components/Header';

it("See my header" , () => {
    render(<Header title={"Dictionary App"}/>)

    expect(screen.getByText("Dictionary App")).toBeInTheDocument()
})