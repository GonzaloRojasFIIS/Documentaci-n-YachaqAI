'use client';

import { useCallback, useEffect, useState } from 'react';

interface ToastState {
  message: string;
  key: number;
  variant: 'info' | 'error';
}

export function useToast() {
  const [state, setState] = useState<ToastState | null>(null);

  const showToast = useCallback((message: string, variant: 'info' | 'error' = 'info') => {
    setState({ message, key: Date.now(), variant });
  }, []);

  useEffect(() => {
    if (!state) return;
    const t = setTimeout(() => setState(null), 3000);
    return () => clearTimeout(t);
  }, [state]);

  const toast = state ? <Toast message={state.message} variant={state.variant} /> : null;

  return { toast, showToast };
}

function Toast({ message, variant }: { message: string; variant: 'info' | 'error' }) {
  return (
    <div
      role="status"
      style={{
        position: 'fixed',
        bottom: '4rem',
        right: '2rem',
        background: variant === 'error' ? 'var(--danger)' : 'var(--bg-card)',
        border: `1px solid ${variant === 'error' ? 'var(--danger)' : 'var(--border-hover)'}`,
        color: variant === 'error' ? '#fff' : 'var(--fg)',
        padding: '0.8em 1.2em',
        borderRadius: 6,
        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
        maxWidth: 360,
        zIndex: 1000,
        fontSize: 14,
      }}
    >
      {message}
    </div>
  );
}
