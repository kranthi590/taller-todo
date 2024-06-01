import { render, waitFor, fireEvent } from '@testing-library/react';
import ActionsMenu, { Props } from './ActionsMenu.tsx';

describe('render', () => {
  it('renders the main page', async () => {
    const deleteTodo = jest.fn();
    const setEditOpen = jest.fn();
    const markStar = jest.fn();
    const data: Props = {
      deleteTodo,
      setEditOpen,
      markStar,
      todo: {
        id: '1',
        title: 'asds',
        completed: true,
        starred: true,
      },
    };
    const { container, getByText } = render(
      <ActionsMenu {...data} />,
    );
    await waitFor(() => {
      fireEvent.click(getByText('Delete'));
      fireEvent.click(getByText('Edit'));
      fireEvent.click(getByText('Unstar'));
      fireEvent.click(document);
    });

    expect(container).toBeInTheDocument();
    expect(deleteTodo).toBeCalled();
    expect(setEditOpen).toBeCalled();
    expect(markStar).toBeCalled();
  });
});
