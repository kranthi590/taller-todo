import { fireEvent, render, waitFor } from '@testing-library/react';
import { DeleteConfirm, Props } from './DeleteConfirm';

describe('<DeleteConfirm />', () => {
  it('renders', async () => {
    const close = jest.fn();
    const yes = jest.fn();
    const data: Props = {
      open: true,
      close,
      yes,
    };
    const { container, getByText } = render(
      <DeleteConfirm {...data} />,
    );
    await waitFor(() => {
      fireEvent.click(getByText('No'));
      fireEvent.click(getByText('Yes'));
    });
    expect(getByText('Are you sure you want to delete this item?')).toBeInTheDocument();
    expect(container).toBeInTheDocument();
    expect(close).toBeCalled();
    expect(yes).toBeCalled();
  });
  it('renders with open=false', async () => {
    const close = jest.fn();
    const yes = jest.fn();
    const data: Props = {
      open: false,
      close,
      yes,
    };
    const { queryByText } = render(
      <DeleteConfirm {...data} />,
    );
    expect(queryByText('Are you sure you want to delete this item?')).toBeNull();
  });
});
