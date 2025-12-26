import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import VaultDashboard from '../VaultDashboard';
import type { Secret } from '../../../shared/types';

describe('VaultDashboard', () => {
    const mockSecrets: Secret[] = [
        {
            id: '1',
            name: 'Test Secret',
            username: 'testuser',
            password: 'testpass',
            notes: 'Test notes',
            tags: ['test'],
            createdAt: Date.now(),
            updatedAt: Date.now(),
        },
    ];

    const mockProps = {
        secrets: mockSecrets,
        onAddSecret: vi.fn(),
        onUpdateSecret: vi.fn(),
        onDeleteSecret: vi.fn(),
        onLock: vi.fn(),
        onGoHome: vi.fn(),
        showToast: vi.fn(),
    };

    it('renders vault dashboard with secrets', () => {
        render(<VaultDashboard {...mockProps} />);
        expect(screen.getByText('Secure Vault')).toBeInTheDocument();
        expect(screen.getByText('1 secrets')).toBeInTheDocument();
    });

    it('displays secret count correctly', () => {
        render(<VaultDashboard {...mockProps} />);
        expect(screen.getByText('1 secrets')).toBeInTheDocument();
    });

    it('shows empty state when no secrets', () => {
        render(<VaultDashboard {...mockProps} secrets={[]} />);
        expect(screen.getByText('No secrets found')).toBeInTheDocument();
    });

    it('calls onLock when lock button clicked', () => {
        render(<VaultDashboard {...mockProps} />);
        const lockButton = screen.getByTitle('Lock vault');
        fireEvent.click(lockButton);
        expect(mockProps.onLock).toHaveBeenCalled();
    });

    it('calls onGoHome when home button clicked', () => {
        render(<VaultDashboard {...mockProps} />);
        const homeButton = screen.getByTitle('Go to home');
        fireEvent.click(homeButton);
        expect(mockProps.onGoHome).toHaveBeenCalled();
    });

    it('filters secrets by search query', () => {
        render(<VaultDashboard {...mockProps} />);
        const searchInput = screen.getByPlaceholderText('Search secrets...');
        fireEvent.change(searchInput, { target: { value: 'Test' } });
        expect(screen.getByText('Test Secret')).toBeInTheDocument();
    });

    it('shows no results when search does not match', () => {
        render(<VaultDashboard {...mockProps} />);
        const searchInput = screen.getByPlaceholderText('Search secrets...');
        fireEvent.change(searchInput, { target: { value: 'nonexistent' } });
        expect(screen.getByText('No secrets found')).toBeInTheDocument();
    });
});
