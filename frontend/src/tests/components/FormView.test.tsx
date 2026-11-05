import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import FormView from '../../components/FormView';

describe('FormView Component', () => {

    it('renders form fields based on selectedForm prop', () => {
        const selectedForm = {
            form_fields: [
                { id: 1, type: 'text', label: 'Name', name: 'name', required: true },
                { id: 2, type: 'number', label: 'Age', name: 'age', required: false },
            ],
        };

        render(<FormView entries={{ form_fields: {} }} disabledFields={false} />);
    })

    it('should send form entries to the server when the form is submitted', async () => {
        const submitMock = vi.fn().mockResolvedValue(undefined);

        render(<FormView/>)
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));
        expect(submitMock).toHaveBeenCalled();
        
    })

    it('should display an error message when form submission fails', async () => {
        const submitMock = vi.fn().mockRejectedValue(new Error('Submission failed'));

        render(<FormView/>)
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));
        expect(await screen.findByText(/Submission failed/i)).toBeInTheDocument();
    })
})