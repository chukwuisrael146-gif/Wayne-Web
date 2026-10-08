import { useEffect } from 'react';

// Animate content once as it enters view, including cards added by View more.
export default function useScrollReveal(containerRef) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !('IntersectionObserver' in window)) return undefined;

    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let stop = () => {};

    function configure() {
      stop();
      if (preference.matches) return;

      const seen = new WeakSet();
      const decorated = new Set();
      const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) reveal(entry.target);
        }
      }, { threshold: 0, rootMargin: '0px 0px -32px 0px' });

      function reveal(element) {
        element.classList.add('is-revealed');
        observer.unobserve(element);
      }

      function register() {
        const elements = container.querySelectorAll(
          'section > *, section article, section form > *, #skills .grid > *, #services .space-y-5 > *, footer',
        );
        for (const element of elements) {
          // The experience timeline controls its own dot and entry timing.
          if (element.closest('[data-scroll-timeline]')) continue;
          if (seen.has(element)) continue;
          seen.add(element);
          decorated.add(element);
          const index = [...element.parentElement.children].indexOf(element);
          element.style.setProperty('--reveal-delay', `${Math.min(index, 3) * 120}ms`);
          element.classList.add('reveal-motion');
          observer.observe(element);
        }
      }

      // Keyboard navigation should never land on hidden content.
      function onFocus(event) {
        for (let element = event.target; element && element !== container; element = element.parentElement) {
          if (element.classList.contains('reveal-motion')) reveal(element);
        }
      }

      register();
      const mutation = new MutationObserver(register);
      mutation.observe(container, { childList: true, subtree: true });
      container.addEventListener('focusin', onFocus);

      stop = () => {
        observer.disconnect();
        mutation.disconnect();
        container.removeEventListener('focusin', onFocus);
        for (const element of decorated) {
          element.classList.remove('reveal-motion', 'is-revealed');
          element.style.removeProperty('--reveal-delay');
        }
      };
    }

    configure();
    preference.addEventListener('change', configure);
    return () => {
      stop();
      preference.removeEventListener('change', configure);
    };
  }, [containerRef]);
}
