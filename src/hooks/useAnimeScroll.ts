import { RefObject } from 'react';
import anime from 'animejs';
import { useScroll, useMotionValueEvent } from 'framer-motion';

/**
 * useAnimeScroll links scroll progress from a container directly to an Anime.js timeline.
 * It provides incredibly precise, butter-smooth scrubbing of animations (like drawing SVG paths)
 * without jank or layout shifts.
 * 
 * @param containerRef - The ref of the container tracking scroll progress
 * @param animeParams - The Anime.js timeline parameters
 * @param offset - Framer motion scroll offset (e.g., ["start start", "end end"])
 * @returns The anime timeline instance (so we can add animations to it)
 */
export function useAnimeScroll(
  containerRef: RefObject<HTMLElement | null>,
  animeParams: anime.AnimeParams,
  offset: any = ["start end", "end start"]
) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: offset,
  });

  // Create the timeline (paused by default so we can scrub it)
  const timeline = anime.timeline({
    ...animeParams,
    autoplay: false,
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Scrub the timeline based on progress (0 to 1)
    if (timeline.duration) {
      timeline.seek(timeline.duration * latest);
    }
  });

  return timeline;
}
