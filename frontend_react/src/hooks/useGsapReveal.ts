import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useGsapReveal(selector = '.reveal') {
  useEffect(() => {
    const items = gsap.utils.toArray<HTMLElement>(selector);
    items.forEach((el) => {
      gsap.fromTo(el, { opacity: 0, y: 28, scale: 0.98 }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 85%' }
      });
    });
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [selector]);
}
