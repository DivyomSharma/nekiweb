import { useEffect, RefObject } from 'react';
import anime from 'animejs';

interface MagnetOptions {
  maxRotation?: number; // degrees
  maxTranslation?: number; // pixels
  ease?: string;
  duration?: number;
}

export function useMouseMagnet(
  ref: RefObject<HTMLElement | null>,
  options: MagnetOptions = {}
) {
  const {
    maxRotation = 5,
    maxTranslation = 10,
    ease = 'easeOutElastic(1, .6)',
    duration = 1000,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      const deltaX = (mouseX - centerX) / (rect.width / 2);
      const deltaY = (mouseY - centerY) / (rect.height / 2);

      // Clamp deltas between -1 and 1
      const clampX = Math.max(-1, Math.min(1, deltaX));
      const clampY = Math.max(-1, Math.min(1, deltaY));

      anime({
        targets: el,
        rotateX: -clampY * maxRotation,
        rotateY: clampX * maxRotation,
        translateX: clampX * maxTranslation,
        translateY: clampY * maxTranslation,
        duration: duration,
        easing: ease,
      });
    };

    const handleMouseLeave = () => {
      anime({
        targets: el,
        rotateX: 0,
        rotateY: 0,
        translateX: 0,
        translateY: 0,
        duration: duration * 1.5,
        easing: 'easeOutElastic(1, .5)',
      });
    };

    // Attach to parent or window depending on preference.
    // For a magnet effect, usually we listen on the window if it's a hero object,
    // or the element itself if it's a button.
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref, duration, ease, maxRotation, maxTranslation]);
}
