"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

const VIDEO = "/media/video/etites-anasayfa.mp4";
// AV1 kopya aynı kalitede daha küçük. Oynatamayan tarayıcı MP4'e geçer.
const VIDEO_AV1 = "/media/video/etites-anasayfa.webm";
const AV1_TYPE = 'video/webm; codecs="av01.0.08M.10"';
const POSTER = "/media/video/etites-anasayfa-poster.jpg";

function subscribeMotion(onChange: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function motionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "reduce" : "allow";
}

function serverMotionSnapshot() {
  return "pending";
}

/**
 * Giriş filmi sessiz ve kendiliğinden oynar, sonunda son karede kalır.
 * Paneller filmi örtünce durur, geri dönülünce kaldığı yerden sürer.
 * Hareket azaltma tercihi açıksa başlangıç görseli görünür.
 */
export default function HeroFilm({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const motion = useSyncExternalStore(subscribeMotion, motionSnapshot, serverMotionSnapshot);
  const autoplay = motion === "allow";
  const [ended, setEnded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    const video = videoRef.current;
    if (!root || !video || failed || !autoplay) return;
    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = root.getBoundingClientRect();
      // Yapışkan giriş, paneller üstünü örterken de görünür alanda kalır
      const deckTop = root.nextElementSibling?.getBoundingClientRect().top ?? rect.bottom;
      const visibleHeight = Math.max(0, Math.min(rect.bottom, deckTop, window.innerHeight) - Math.max(0, rect.top));
      const visible = visibleHeight > Math.min(rect.height, window.innerHeight) * 0.3;
      const shouldPlay = visible && document.visibilityState === "visible" && !video.ended;
      if (shouldPlay && video.paused) void video.play().catch(() => {});
      if (!shouldPlay && !video.paused) video.pause();
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    document.addEventListener("visibilitychange", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      document.removeEventListener("visibilitychange", schedule);
      cancelAnimationFrame(raf);
      video.pause();
    };
  }, [autoplay, failed]);

  return (
    <section
      ref={rootRef}
      className="hero hero--film"
      data-hero
      data-film-ended={ended}
      data-film-failed={failed}
      aria-labelledby="hero-title"
    >
      <div className="hero__media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={POSTER} width={1920} height={1080} alt="Plaza dış görünümü" fetchPriority="high" />
        <video
          ref={videoRef}
          poster={POSTER}
          width={1920}
          height={1080}
          muted
          playsInline
          autoPlay={autoplay}
          preload={autoplay ? "auto" : "metadata"}
          aria-label="Etites mekanik tesisat tanıtım filmi"
          onEnded={() => setEnded(true)}
        >
          <source src={VIDEO_AV1} type={AV1_TYPE} />
          <source src={VIDEO} type="video/mp4" onError={() => setFailed(true)} />
        </video>
      </div>
      {children}
    </section>
  );
}
