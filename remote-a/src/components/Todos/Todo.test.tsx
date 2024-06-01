import { render } from '@testing-library/react';
import Todo, { Props } from './Todo';
import { MainProvider } from '../../context/MainContext.tsx';

describe('<AddTodo />', () => {
  it('renders', async () => {
    const onDelete = jest.fn();
    const onEdit = jest.fn();
    const data: Props = {
      todo: {
        id: '1',
        title: 'asds',
        completed: true,
        starred: true,
      },
      index: 1,
      onDelete,
      onEdit,
    };
    const { getByText } = render(
      <MainProvider>
        <Todo {...data} />
      </MainProvider>,
    );
    expect(getByText('asds')).toBeInTheDocument();
  });
});
