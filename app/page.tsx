import AetherHero from '@/components/main/hero';
import Navbar from '@/components/main/navbar';

export default function Home() {
  return (
    <main>
      <div style={{ position: "relative", minHeight: "100vh" }}>
        <Navbar />
        <AetherHero
          title="Nailart AI, 유튜브 썸네일을 몇 초 안에 완성하세요."
          subtitle="AI가 색감, 구성, 키 메시지를 자동 제안해서 영상 콘텐츠에 딱 맞는 썸네일을 만들어 드립니다."
          ctaLabel="썸네일 만들기"
          secondaryCtaLabel="포트폴리오 보기"
          ariaLabel="Nailart AI 영상을 위한 감각적인 히어로 섹션"
        />
      </div>
    </main>
  );
}
