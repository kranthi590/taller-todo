import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import AddTodo from './AddTodo';
import userEvent from '@testing-library/user-event';

describe('<AddTodo />', () => {
  it('renders', async () => {
    const addTodo = jest.fn();
    const data = {
      addTodo,
    };
    const { getByText } = render(
      <AddTodo {...data} />,
    );
    const input = await screen.findByPlaceholderText('add-todo');
    await userEvent.type(input, 'Jay');
    await act(async () => {
      await waitFor(() => {
        expect(input).toHaveValue('Jay');
        fireEvent.click(getByText('Add'));
      });
    });
    expect(addTodo).toBeCalled();
  });
});
