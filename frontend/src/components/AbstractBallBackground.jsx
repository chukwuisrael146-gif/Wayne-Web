import { useEffect, useRef } from 'react';
import '../styles/abstract-ball.css';

export default function AbstractBallBackground() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');

    function syncPlayback() {
      if (document.hidden || preference.matches) {
        video.pause();
      } else {
        // Keep the loaded frame if browser preferences block autoplay.
        video.play().catch(() => {});
      }
    }

    syncPlayback();
    document.addEventListener('visibilitychange', syncPlayback);
    preference.addEventListener('change', syncPlayback);
    return () => {
      video.pause();
      document.removeEventListener('visibilitychange', syncPlayback);
      preference.removeEventListener('change', syncPlayback);
    };
  }, []);

  return (
    <div className="abstract-background" aria-hidden="true">
      <video
        ref={videoRef}
        className="abstract-background__video"
        src={`${import.meta.env.BASE_URL}videos/hero.mp4`}
        muted
        loop
        playsInline
        preload="auto"
        tabIndex={-1}
      />
      <div className="abstract-background__shade" />
    </div>
  );
}
