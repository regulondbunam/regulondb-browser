import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Title RegulonDB Browser', () => {
  render(<App />);
  const linkElement = screen.getByText('The RegulonDB Browser');
  expect(linkElement).toBeInTheDocument();
});
