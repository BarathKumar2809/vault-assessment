// Utility functions for secret display
export function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function getCategoryIcon(category?: string): string {
  switch (category) {
    case 'login': return '🔑';
    case 'credit-card': return '💳';
    case 'secure-note': return '📝';
    case 'other': return '📌';
    default: return '🔑';
  }
}