import { render } from '@testing-library/react';
import App from './App';
import { MainProvider } from './context/MainContext.tsx';

describe('render', () => {
  it('renders the main page', () => {
    render(
      <MainProvider>
        <App />
      </MainProvider>
    );
    expect(true).toBeTruthy();
  });
});
