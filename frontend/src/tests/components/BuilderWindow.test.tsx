import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi, } from 'vitest';


//COMPONENTS
import BuilderWindow from '../../components/BuilderWindow/BuilderWindow';
import FormView from '../../components/FormView';
import { useFormListStore } from '../../stores/useFormListStore';
import { useModalStore } from '../../stores/useModalStore';
import { useFormBuilderStore } from '../../stores/useFormBuilderStore';

vi.mock('../../components/FormView', () => ({
  default: () => <div data-testid='form-preview'>Form preview</div>,
}));

describe('BuilderWindow', () => {
  beforeEach(() => {
    useFormListStore.setState({ selectedForm: null });
    useFormBuilderStore.getState().initializeForm(null);
    useModalStore.setState({ modalOpen: false, modalMode: null });
  });

  it('renders the builder and asks the user to add fields', () => {
    render(<BuilderWindow />);

    expect(screen.getByText('Form Fields')).toBeInTheDocument();
    expect(
      screen.getByText('Drag and drop fields here to create your form'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Select a field to edit validations'),
    ).toBeInTheDocument();
  });

  it('switches between the builder and form preview', () => {
    render(<BuilderWindow />);

    fireEvent.click(screen.getByRole('button', { name: 'preview' }));

    expect(screen.getByTestId('form-preview')).toBeInTheDocument();
    expect(screen.queryByText('Form Fields')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'build' }));

    expect(screen.getByText('Form Fields')).toBeInTheDocument();
    expect(screen.queryByTestId('form-preview')).not.toBeInTheDocument();
  });

  it('adds a field from the palette and lets the user edit it', () => {
    render(<BuilderWindow />);

    const dataTransfer = {
      effectAllowed: '',
      dropEffect: '',
      setData: vi.fn(),
    };

    fireEvent.dragStart(screen.getByText('text').closest('[draggable="true"]')!, {
      dataTransfer,
    });
    fireEvent.drop(screen.getByTestId('fields-list'), { dataTransfer });

    const labelInput = screen.getByLabelText('Field Label');
    expect(labelInput).toHaveValue('New text field');

    fireEvent.change(labelInput, { target: { value: 'Contact name' } });

    expect(screen.getByLabelText('Field Label')).toHaveValue('Contact name');
  });

  it('closes the modal from the close button', () => {
    useModalStore.setState({ modalOpen: true, modalMode: 'editing' });
    render(<BuilderWindow />);

    fireEvent.click(screen.getByRole('button', { name: 'x' }));

    expect(useModalStore.getState().modalOpen).toBe(false);
    expect(useModalStore.getState().modalMode).toBeNull();
  });

  it('successfully updates the form name and description', () => {
    render(<BuilderWindow />);

    const nameInput = screen.getByPlaceholderText('Insert Form Name');
    const descriptionInput = screen.getByPlaceholderText('Insert Form description');

    fireEvent.change(nameInput, { target: { value: 'My Form' } });
    fireEvent.change(descriptionInput, {
      target: { value: 'This is a test form' },
    });

    expect(useFormBuilderStore.getState().formName).toBe('My Form');
    expect(useFormBuilderStore.getState().formDescription).toBe(
      'This is a test form',
    );
  });

  it('successfully updates the form name and description in preview mode', () => {

    render(<BuilderWindow />);
    fireEvent.click(screen.getByRole('button', { name: 'preview' }));
    render(<FormView/>);
    const nameInput = screen.getByPlaceholderText('Insert Form Name');
    const descriptionInput = screen.getByPlaceholderText('Insert Form description');

    fireEvent.change(nameInput, { target: { value: 'My Form' } });
    fireEvent.change(descriptionInput, {
      target: { value: 'This is a test form' },
    });

    
  })

  it('successfully sends and creates a new form', async () => {
  const mockInsert = vi.fn().mockResolvedValue(undefined);
  useFormListStore.setState({ insertForm: mockInsert });
  useModalStore.setState({ modalMode: 'newForm' });

  render(<BuilderWindow />);
  fireEvent.change(screen.getByPlaceholderText('Insert Form Name'), {
    target: { value: 'New form' },
  });

  const dataTransfer = {
    effectAllowed: '',
    dropEffect: '',
    setData: vi.fn(),
  };

  fireEvent.dragStart(
    screen.getByText('text').closest('[draggable="true"]')!,
    { dataTransfer },
  );
  fireEvent.drop(screen.getByTestId('fields-list'), { dataTransfer });

  fireEvent.click(screen.getByRole('button', { name: 'save' }));

  await waitFor(() => {
    expect(mockInsert).toHaveBeenCalled();
  });
});
})