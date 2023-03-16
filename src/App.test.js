import {render, screen} from '@testing-library/react'
import GameField from './GameField'

test('renders welcome message', () => {
  render(<GameField/>);
  const linkElement = screen.getByText(
      'Welcome to yet another Tic-Tac-Toe Game!')
  expect(linkElement).toBeInTheDocument()
})
