import { useState, useCallback } from 'react';
import type { Notification, NotificationType } from '../types';

export function useToast() {
  const [toasts, setToasts] = useState<Notification[]>([]);

  const showToast = useCallback((message: string, type: NotificationType = 'info', duration: number = 3000) => {
    const id = crypto.randomUUID();
    const toast: Notification = { id, message, type, duration };
    
    setToasts(prev => [...prev, toast]);
    
    if (duration > 0) {
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, duration);
    }
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  return { toasts, showToast, dismissToast, clearAllToasts };
}
