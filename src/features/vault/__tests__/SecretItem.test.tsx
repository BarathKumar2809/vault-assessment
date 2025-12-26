import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SecretItem from '../SecretItem';
import type { Secret } from '../../../shared/types';

describe('SecretItem', () => {
    const mockSecret: Secret = {
        id: '1',
        name: 'Gmail',
        username: 'user@gmail.com',
        password: 'SecurePass123!',
        notes: 'Personal email',
        tags: ['email', 'personal'],
        createdAt: Date.now() - 86400000,
        updatedAt: Date.now(),
    };

    const mockProps = {
        secret: mockSecret,
        onDelete: vi.fn(),
        onEdit: vi.fn(),
        showToast: vi.fn(),
    };

    it('renders secret item with name and username', () => {
        render(<SecretItem {...mockProps} />);
        expect(screen.getByText('Gmail')).toBeInTheDocument();
        expect(screen.getByText('user@gmail.com')).toBeInTheDocument();
    });

    it('expands to show details when clicked', () => {
        render(<SecretItem {...mockProps} />);
        const header = screen.getByText('Gmail').closest('.secret-header');
        fireEvent.click(header!);
        expect(screen.getByText('Notes:')).toBeInTheDocument();
        expect(screen.getByText('Personal email')).toBeInTheDocument();
    });

    it('hides password by default', () => {
        render(<SecretItem {...mockProps} />);
        const header = screen.getByText('Gmail').closest('.secret-header');
        fireEvent.click(header!);
        expect(screen.getByText('••••••••')).toBeInTheDocument();
    });

    it('toggles password visibility', () => {
        render(<SecretItem {...mockProps} />);
        const header = screen.getByText('Gmail').closest('.secret-header');
        fireEvent.click(header!);

        const showButton = screen.getByTitle('Hide password');
        fireEvent.click(showButton);
        expect(screen.getByText('SecurePass123!')).toBeInTheDocument();
    });

    it('calls onEdit when edit button clicked', () => {
        render(<SecretItem {...mockProps} />);
        const editButton = screen.getByTitle('Edit secret');
        fireEvent.click(editButton);
        expect(mockProps.onEdit).toHaveBeenCalledWith(mockSecret);
    });

    it('shows delete confirmation dialog', () => {
        render(<SecretItem {...mockProps} />);
        const deleteButton = screen.getByTitle('Delete secret');
        fireEvent.click(deleteButton);
        expect(screen.getByText('Are you sure you want to delete this secret?')).toBeInTheDocument();
    });

    it('calls onDelete when confirmed', () => {
        render(<SecretItem {...mockProps} />);
        const deleteButton = screen.getByTitle('Delete secret');
        fireEvent.click(deleteButton);

        const confirmButton = screen.getByText('Delete');
        fireEvent.click(confirmButton);
        expect(mockProps.onDelete).toHaveBeenCalledWith('1');
    });

    it('displays tags when present', () => {
        render(<SecretItem {...mockProps} />);
        const header = screen.getByText('Gmail').closest('.secret-header');
        fireEvent.click(header!);
        expect(screen.getByText('email')).toBeInTheDocument();
        expect(screen.getByText('personal')).toBeInTheDocument();
    });

    it('shows timestamps', () => {
        render(<SecretItem {...mockProps} />);
        const header = screen.getByText('Gmail').closest('.secret-header');
        fireEvent.click(header!);
        expect(screen.getByText('Created:')).toBeInTheDocument();
        expect(screen.getByText('Updated:')).toBeInTheDocument();
    });
});
