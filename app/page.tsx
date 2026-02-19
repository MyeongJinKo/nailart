"use client";

import Navbar from '@/components/main/navbar';
import AetherHero from '@/components/main/hero';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
  const { user } = useAuth();
  const ctaHref = user ? '/dashboard' : '/auth';
  const ctaLabel = user ? '대시보드로 이동' : '지금 시작하기';

  return (
    <main>
      <div style={{ position: 'relative', minHeight: '100vh' }}>
        <Navbar />
        <AetherHero
          title="Nailart AI, 유튜브 썸네일을 몇 초 안에 완성하세요."
          subtitle="AI가 색감, 구성, 키 메시지를 자동 제안해서 영상 콘텐츠에 딱 맞는 썸네일을 만들어 드립니다."
          ariaLabel="Nailart AI 영상을 위한 감각적인 히어로 섹션"
          ctaHref={ctaHref}
          ctaLabel={ctaLabel}
        />
      </div>
    </main>
  );
}
