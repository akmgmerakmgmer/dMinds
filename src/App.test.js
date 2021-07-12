import { render, screen } from '@testing-library/react';
import App from './App';
import {say,say2} from './components/Contacts/Contact1'
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

