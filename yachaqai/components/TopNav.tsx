'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Search, Settings } from 'lucide-react';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import { PAGE_TYPE_HEX } from '@/lib/page-type-palette';

const NAV_ITEMS = [
  { href: '/', label: 'Inicio', isActive: (p: string) => p === '/' },
  { href: '/wiki', label: 'Wiki', isActive: (p: string) => p.startsWith('/wiki') },
  { href: '/chat', label: 'Chat', isActive: (p: string) => p.startsWith('/chat') },
  { href: '/sources', label: 'Fuentes', isActive: (p: string) => p.startsWith('/sources') },
] as const;

interface SearchResult {
  page_id: string;
  title: string;
  page_type: string;
  category: string | null;
}

function debounce<T extends (...args: Parameters<T>) => void>(fn: T, ms: number): T {
  let timer: ReturnType<typeof setTimeout>;
  return ((...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  }) as T;
}

export default function TopNav() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParamsHook = useSearchParams();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const [selIndex, setSelIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onMouseDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSelIndex(-1);
      }
    }
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, []);

  const fetchResults = useCallback(
    debounce(async (q: string) => {
      if (q.trim().length < 2) { setResults([]); setOpen(false); return; }
      try {
        const res = await fetch(`/api/pages/search?q=${encodeURIComponent(q.trim())}&limit=3`);
        const data = (await res.json()) as { items: SearchResult[] };
        setResults(data.items);
        setOpen(true);
        setSelIndex(-1);
      } catch {
        setResults([]);
      }
    }, 250),
    [],
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const q = e.target.value;
    setQuery(q);
    if (q.trim().length < 2) { setResults([]); setOpen(false); setSelIndex(-1); }
    else fetchResults(q);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    const total = results.length + 1;
    if (e.key === 'Escape') {
      setQuery(''); setResults([]); setOpen(false); setSelIndex(-1);
      return;
    }
    if (e.key === 'ArrowDown' && open) {
      e.preventDefault();
      setSelIndex((i) => (i + 1) % total);
      return;
    }
    if (e.key === 'ArrowUp' && open) {
      e.preventDefault();
      setSelIndex((i) => (i - 1 + total) % total);
      return;
    }
    if (e.key === 'Enter' && query.trim()) {
      e.preventDefault();
      if (open && selIndex >= 0 && selIndex < results.length) {
        router.push(`/wiki/${results[selIndex].page_id}`);
      } else {
        router.push(`/wiki/search?q=${encodeURIComponent(query.trim())}`);
      }
      setOpen(false);
      setSelIndex(-1);
    }
  }

  function goToResult(pageId: string) {
    setOpen(false); setQuery(''); setResults([]); setSelIndex(-1);
    router.push(`/wiki/${pageId}`);
  }

  function goToSearch() {
    setOpen(false); setSelIndex(-1);
    router.push(`/wiki/search?q=${encodeURIComponent(query.trim())}`);
  }

  const showDropdown = open && query.trim().length >= 2;

  if (pathname.startsWith('/onboarding')) return null;

  return (
    <header
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        height: 65,
        zIndex: 100,
        background: 'var(--bg)',
        borderBottom: '1px solid rgba(var(--separator-rgb), 0.5)',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 56px',
      }}
    >
      <Link href="/" style={{ display: 'flex', alignItems: 'center', flexShrink: 0, textDecoration: 'none' }}>
        <span style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: '-0.5px',
          color: 'var(--fg)',
        }}>
          YachaAI
        </span>
      </Link>

      <nav style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 32 }}>
        {NAV_ITEMS.map((item) => {
          const active = item.isActive(pathname);
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 15,
                fontWeight: 500,
                letterSpacing: '-0.3px',
                color: active ? 'var(--accent)' : 'var(--fg-muted)',
                opacity: active ? 1 : 0.85,
                paddingBottom: active ? 4 : 0,
                borderBottom: active ? '2px solid var(--accent)' : 'none',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                transition: 'color var(--transition-fast), opacity var(--transition-fast)',
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 16, flexShrink: 0 }}>
        <div ref={containerRef} style={{ position: 'relative' }}>
          <input
            type="text"
            className="topnav-search"
            placeholder="Buscar wiki"
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => { if (results.length > 0) setOpen(true); }}
            style={{
              width: 192,
              height: 34,
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: showDropdown ? '6px 6px 0 0' : 6,
              padding: '0 32px 0 12px',
              fontFamily: 'var(--font-body)',
              fontSize: 12,
              letterSpacing: '0.5px',
              color: 'var(--fg-secondary)',
              outline: 'none',
            }}
          />
          <Search
            size={14}
            style={{
              position: 'absolute',
              right: 10,
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--fg-dim)',
              pointerEvents: 'none',
            }}
          />

          {showDropdown && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                width: 320,
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderTop: 'none',
                borderRadius: '0 0 6px 6px',
                zIndex: 200,
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
              }}
            >
              {results.length === 0 ? (
                <div style={{ padding: '10px 14px', fontSize: 12, color: 'var(--fg-dim)', fontFamily: 'var(--font-body)' }}>
                  No se encontraron páginas
                </div>
              ) : (
                results.map((r, i) => (
                  <button
                    key={r.page_id}
                    onMouseDown={() => goToResult(r.page_id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      width: '100%',
                      padding: '9px 14px',
                      background: selIndex === i ? 'var(--bg-card-hover)' : 'transparent',
                      border: 'none',
                      borderBottom: '1px solid rgba(var(--separator-rgb),0.3)',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                    onMouseEnter={() => setSelIndex(i)}
                  >
                    <span
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: '50%',
                        background: PAGE_TYPE_HEX[r.page_type as keyof typeof PAGE_TYPE_HEX] ?? 'var(--fg-dim)',
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ flex: 1, fontSize: 13, color: 'var(--fg)', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {r.title}
                    </span>
                    {r.category && (
                      <span style={{ fontSize: 10, color: 'var(--fg-dim)', fontFamily: 'var(--font-mono)', flexShrink: 0 }}>
                        {r.category}
                      </span>
                    )}
                  </button>
                ))
              )}
              <button
                onMouseDown={goToSearch}
                onMouseEnter={() => setSelIndex(results.length)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  width: '100%',
                  padding: '9px 14px',
                  background: selIndex === results.length ? 'var(--bg-card-hover)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <Search size={11} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: 'var(--accent)', fontFamily: 'var(--font-body)' }}>
                  Ver todos los resultados para &ldquo;{query}&rdquo;
                </span>
              </button>
            </div>
          )}
        </div>

        <Link
          href="/settings"
          style={{
            display: 'flex',
            alignItems: 'center',
            color: pathname.startsWith('/settings') ? 'var(--accent)' : 'var(--fg-muted)',
            transition: 'color var(--transition-fast)',
          }}
        >
          <Settings size={18} />
        </Link>
      </div>
    </header>
  );
}
