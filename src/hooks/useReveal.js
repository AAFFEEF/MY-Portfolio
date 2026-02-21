import { useEffect, useRef } from 'react';

/**
 * useReveal — attaches IntersectionObserver to all `.reveal`, `.reveal-left`,
 * `.reveal-right` children inside the returned ref.  When an element enters the
 * viewport it gets the `visible` class which triggers the CSS transition.
 *
 * @param {number} threshold  – 0–1, portion of element visible before triggering
 * @param {string} rootMargin – optional offset e.g. '0px 0px -80px 0px'
 */
export default function useReveal(threshold = 0.15, rootMargin = '0px 0px -60px 0px') {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const targets = el.querySelectorAll('.reveal, .reveal-left, .reveal-right');

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target); // animate only once
                    }
                });
            },
            { threshold, rootMargin }
        );

        targets.forEach((t) => observer.observe(t));
        return () => observer.disconnect();
    }, [threshold, rootMargin]);

    return ref;
}
