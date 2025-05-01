import '@testing-library/jest-dom'  // Importa PRIMA di tutto
import { render, screen } from '@testing-library/react'
import Hello from '../components/Hello'

describe('Hello component', () => {
  it('renders the correct text', () => {
    render(<Hello />)
    expect(screen.getByText('Hello, world!')).toBeInTheDocument()  // Funziona ora
  })
})
