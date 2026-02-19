"use client";

import Image from "next/image";

const NAV_LINKS = [
  { label: "기능", href: "#features" },
  { label: "가격", href: "#pricing" },
  { label: "문의", href: "#contact" },
];

export default function Navbar() {
  return (
    <header
      role="banner"
      aria-label="Nailart AI 내비게이션"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1.75rem clamp(1.25rem, 4vw, 3rem)",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        zIndex: 30,
        color: "#ffffff",
        textShadow: "0 2px 18px rgba(0,0,0,0.35)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        <Image src="/nailart_logo.png" alt="Nailart AI 로고" width={64} height={64} />
        <span
          style={{
            fontSize: "1.4rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
          }}
        >
          Nailart AI
        </span>
      </div>

      <nav
        aria-label="주요 섹션"
        style={{
          display: "flex",
          gap: "2.5rem",
          fontSize: "1.2rem",
          fontWeight: 600,
          letterSpacing: "0.08em",
        }}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            style={{
              color: "inherit",
              textDecoration: "none",
              opacity: 0.9,
              transition: "opacity 0.2s ease",
            }}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <a
        href="#get-started"
        style={{
          padding: "0.9rem 1.6rem",
          borderRadius: "999px",
          background:
            "linear-gradient(130deg, rgba(255,171,255,0.9), rgba(92,234,255,0.9))",
          color: "#050505",
          fontWeight: 600,
          textDecoration: "none",
          boxShadow: "0 15px 40px rgba(1,1,1,0.25)",
        }}
      >
        지금 시작하기
      </a>
    </header>
  );
}
