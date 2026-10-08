import { useEffect } from 'react';

// The viewport guides the dot; entries reveal only when it reaches their marker.
export default function useTimelineProgress(timelineRef) {
  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return undefined;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const items = [...timeline.querySelectorAll('.experience-item')];
    let stop = () => {};

    function configure() {
      stop();
      if (preference.matches) return;
      let frame = 0;
      let progress = 0;
      let lastTime = 0;

      function update(time) {
        frame = 0;
        const rect = timeline.getBoundingClientRect();
        const start = 8;
        const length = Math.max(0, items[items.length - 1].offsetTop);
        const cursor = window.innerHeight * 0.62 - rect.top - start;
        const target = Math.max(0, Math.min(length, cursor));
        // Follow scroll gently, with the same speed on different refresh rates.
        const elapsed = lastTime ? Math.min(time - lastTime, 64) : 16;
        lastTime = time;
        progress += (target - progress) * (1 - Math.exp(-elapsed / 260));
        if (Math.abs(target - progress) < 0.35) progress = target;
        timeline.style.setProperty('--timeline-length', `${length}px`);
        timeline.style.setProperty('--timeline-progress', `${progress}px`);
        timeline.classList.toggle('timeline-started', cursor >= 0);
        for (const item of items) {
          if (cursor >= 0 && progress >= item.offsetTop) item.classList.add('is-reached');
        }
        // Stop requesting frames once the dot settles; resume on scroll/resize.
        if (progress !== target) frame = window.requestAnimationFrame(update);
        else lastTime = 0;
      }

      function schedule() {
        if (!frame) frame = window.requestAnimationFrame(update);
      }

      update(performance.now());
      timeline.classList.add('timeline-ready');
      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', schedule);
      const resize = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(schedule) : null;
      resize?.observe(timeline);
      stop = () => {
        window.cancelAnimationFrame(frame);
        window.removeEventListener('scroll', schedule);
        window.removeEventListener('resize', schedule);
        resize?.disconnect();
        timeline.classList.remove('timeline-ready', 'timeline-started');
        timeline.style.removeProperty('--timeline-length');
        timeline.style.removeProperty('--timeline-progress');
        for (const item of items) item.classList.remove('is-reached');
      };
    }

    configure();
    preference.addEventListener('change', configure);
    return () => {
      stop();
      preference.removeEventListener('change', configure);
    };
  }, [timelineRef]);
}
