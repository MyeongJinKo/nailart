'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { supabase } from '@/lib/supabaseClient';
import { useAuth } from '@/context/AuthContext';

export default function AuthPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextMessage, setNextMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && user) {
      router.replace('/dashboard');
    }
  }, [authLoading, user, router]);

  const handleGoogleLogin = useCallback(async () => {
    if (buttonLoading) return;
    setError(null);
    setNextMessage(null);
    setButtonLoading(true);

    if (typeof window === 'undefined') {
      setError('브라우저 환경에서만 로그인할 수 있습니다.');
      setButtonLoading(false);
      return;
    }

    const redirect = `${window.location.origin}/`;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirect,
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setNextMessage('새 창이 열리지 않으면 브라우저 팝업을 허용했는지 확인해 주세요.');
    }

    setButtonLoading(false);
  }, [buttonLoading]);
  return (
    <main
      style={{
        position: 'relative',
        minHeight: '100vh',
        background:
          'radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.12) 0%, transparent 30%),' +
          'radial-gradient(circle at 80% 0%, rgba(107, 201, 255, 0.2) 0%, transparent 35%),' +
          'linear-gradient(180deg, #010101 0%, #070707 55%, #010101 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(1.5rem, 3vw, 3rem)',
      }}
    >
      <Link
        href="/"
        style={{
          position: 'absolute',
          top: '1.25rem',
          left: '1.25rem',
          padding: '0.6rem 1.2rem',
          borderRadius: 999,
          border: '1px solid rgba(255,255,255,0.35)',
          color: '#fff',
          background: 'rgba(0,0,0,0.35)',
          textDecoration: 'none',
          fontSize: '0.85rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          transition: 'background 0.2s ease',
        }}
      >
        Back
      </Link>
      <section
        aria-label="Nailart AI 로그인 화면"
        style={{
          width: 'min(480px, 92vw)',
          borderRadius: 28,
          background: 'rgba(5,5,5,0.75)',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
          padding: 'clamp(2.5rem, 3vw, 3.5rem)',
          color: '#ffffff',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
        }}
      >
        <p
          style={{
            margin: 0,
            textTransform: 'uppercase',
            letterSpacing: '0.4em',
            fontSize: '0.85rem',
            opacity: 0.8,
          }}
        >
          Nailart AI
        </p>
        <h1
          style={{
            margin: 0,
            fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.01em',
          }}
        >
          유튜브 썸네일의 감각적인 시작
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: '1rem',
            lineHeight: 1.6,
            opacity: 0.85,
          }}
        >
          Nailart AI가 준비한 고품질 썸네일을 만나보려면 구글 계정으로 로그인하세요.
          로그인 한 번이면 바로 디자인을 추천해드립니다.
        </p>

        {user ? (
          <Link
            href="/dashboard"
            style={{
              marginTop: '0.5rem',
              padding: '0.95rem 1.8rem',
              fontSize: '1rem',
              fontWeight: 600,
              borderRadius: 999,
              textDecoration: 'none',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              background: 'rgba(255,255,255,0.1)',
              color: '#f5f5f5',
              border: '1px solid rgba(255,255,255,0.25)',
            }}
          >
            대시보드로 이동
          </Link>
        ) : (
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={buttonLoading}
            style={{
              marginTop: '0.5rem',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.625rem',
              padding: '0.95rem 1.8rem',
              fontSize: '1rem',
              fontWeight: 600,
              borderRadius: 999,
              border: 'none',
              cursor: buttonLoading ? 'wait' : 'pointer',
              background:
                'linear-gradient(130deg, rgba(255, 103, 150, 1), rgba(104, 215, 255, 1))',
              color: '#050505',
              letterSpacing: '0.05em',
              boxShadow: '0 12px 35px rgba(0,0,0,0.35)',
              opacity: buttonLoading ? 0.7 : 1,
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
              style={{ display: 'block' }}
            >
              <circle cx="10" cy="10" r="10" fill="#fff" opacity={0.9} />
              <text
                x="10"
                y="13"
                textAnchor="middle"
                fontSize="10"
                fontWeight="700"
                fill="#1a73e8"
              >
                G
              </text>
            </svg>
            {buttonLoading ? '로그인 중...' : 'Google 로그인'}
          </button>
        )}

        <footer
          style={{
            marginTop: '0.5rem',
            fontSize: '0.9rem',
            opacity: 0.75,
            lineHeight: 1.4,
          }}
        >
          지금 로그인하면 Nailart AI의 추천 키워드와 색감 조합을 바로 받아볼 수 있습니다.
        </footer>
        {error ? (
          <p
            role="alert"
            style={{ margin: '0.25rem 0 0', color: '#ff6b6b', fontWeight: 500 }}
          >
            {error}
          </p>
        ) : user ? (
          <p style={{ margin: '0.25rem 0 0', color: '#9ef2ff' }}>
            로그인되어 있으니 대시보드로 이동합니다.
          </p>
        ) : nextMessage ? (
          <p style={{ margin: '0.25rem 0 0', color: '#b3f0ff' }}>{nextMessage}</p>
        ) : null}
      </section>
    </main>
  );
}
