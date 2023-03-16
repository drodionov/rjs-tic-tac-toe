import {render, screen} from '@testing-library/react'
import App from './App'

test('renders welcome message', () => {
  render(<App/>);
  const linkElement = screen.getByText(
      'Welcome to yet another Tic-Tac-Toe Game!')
  expect(linkElement).toBeInTheDocument()
})
