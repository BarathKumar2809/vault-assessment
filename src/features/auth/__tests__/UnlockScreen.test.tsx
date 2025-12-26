import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UnlockScreen from '../UnlockScreen';

describe('UnlockScreen', () => {
    it('renders unlock screen for existing vault', () => {
        const mockOnUnlock = vi.fn();
        render(<UnlockScreen onUnlock={mockOnUnlock} isFirstTime={false} />);
        expect(screen.getByText('Unlock Vault')).toBeInTheDocument();
    });

    it('renders create password screen for first time', () => {
        const mockOnUnlock = vi.fn();
        render(<UnlockScreen onUnlock={mockOnUnlock} isFirstTime={true} />);
        expect(screen.getByText('Create Master Password')).toBeInTheDocument();
    });

    it('shows password strength indicator for first time setup', () => {
        const mockOnUnlock = vi.fn();
        render(<UnlockScreen onUnlock={mockOnUnlock} isFirstTime={true} />);
        const passwordInput = screen.getByLabelText('Master Password');
        fireEvent.change(passwordInput, { target: { value: 'Test123!' } });
        expect(screen.getByText(/Password needs:/)).toBeInTheDocument();
    });

    it('requires password confirmation for first time', () => {
        const mockOnUnlock = vi.fn();
        render(<UnlockScreen onUnlock={mockOnUnlock} isFirstTime={true} />);
        expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    });

    it('calls onUnlock when form submitted with valid password', async () => {
        const mockOnUnlock = vi.fn().mockResolvedValue(true);
        render(<UnlockScreen onUnlock={mockOnUnlock} isFirstTime={false} />);

        const passwordInput = screen.getByLabelText('Master Password');
        const submitButton = screen.getByRole('button', { name: /Unlock Vault/i });

        fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockOnUnlock).toHaveBeenCalledWith('testpassword');
        });
    });

    it('shows error message on incorrect password', async () => {
        const mockOnUnlock = vi.fn().mockResolvedValue(false);
        render(<UnlockScreen onUnlock={mockOnUnlock} isFirstTime={false} />);

        const passwordInput = screen.getByLabelText('Master Password');
        const submitButton = screen.getByRole('button', { name: /Unlock Vault/i });

        fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Incorrect password. Please try again.')).toBeInTheDocument();
        });
    });

    it('toggles password visibility', () => {
        const mockOnUnlock = vi.fn();
        render(<UnlockScreen onUnlock={mockOnUnlock} isFirstTime={false} />);

        const passwordInput = screen.getByLabelText('Master Password') as HTMLInputElement;
        const toggleButton = screen.getAllByRole('button')[0]; // First button is toggle

        expect(passwordInput.type).toBe('password');
        fireEvent.click(toggleButton);
        expect(passwordInput.type).toBe('text');
    });

    it('disables submit button when loading', async () => {
        const mockOnUnlock = vi.fn().mockImplementation(() => new Promise(() => { }));
        render(<UnlockScreen onUnlock={mockOnUnlock} isFirstTime={false} />);

        const passwordInput = screen.getByLabelText('Master Password');
        const submitButton = screen.getByRole('button', { name: /Unlock Vault/i });

        fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(submitButton).toBeDisabled();
        });
    });
});
