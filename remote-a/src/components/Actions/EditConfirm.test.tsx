import { fireEvent, render, waitFor, act, screen } from '@testing-library/react';
import EditConfirm, { Props } from './EditConfirm';

describe('<EditConfirm />', () => {
  it('renders', async () => {
    const close = jest.fn();
    const yes = jest.fn();
    const data: Props = {
      open: true,
      close,
      yes,
      value: 'hello',
    };
    const { container, getByText } = render(
      <EditConfirm {...data} />,
    );
    await act(async () => {
      await waitFor(() => {
        fireEvent.change(screen.getByDisplayValue('hello'), {
          target: { value: 'new value' },
        });
        fireEvent.click(getByText('OK'));
        fireEvent.click(getByText('Cancel'));
      });
    });
    expect(getByText('Please provide the new name for this item.')).toBeInTheDocument();
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
      value: 'hello',
    };
    const { queryByText } = render(
      <EditConfirm {...data} />,
    );
    expect(queryByText('Please provide the new name for this item.')).toBeNull();
  });
});
