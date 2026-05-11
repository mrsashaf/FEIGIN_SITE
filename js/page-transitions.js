/**
 * Page Transitions — fade-in, smooth scroll, fade-out
 * Used on ALL pages
 */
document.addEventListener("DOMContentLoaded", () => {
    // Page fade-in
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease-in-out';
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });

    // Anchor link smooth scroll with easing
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const startPosition = window.scrollY;
                const distance = targetPosition - startPosition;
                const duration = 1200; // 1.2s smooth cinematic duration
                let start = null;

                window.requestAnimationFrame(function step(timestamp) {
                    if (!start) start = timestamp;
                    const progress = timestamp - start;

                    // easeInOutQuart
                    const ease = progress < duration / 2
                        ? 8 * Math.pow(progress / duration, 4)
                        : 1 - Math.pow(-2 * (progress / duration) + 2, 4) / 2;

                    window.scrollTo(0, startPosition + distance * ease);

                    if (progress < duration) {
                        window.requestAnimationFrame(step);
                    } else {
                        window.scrollTo(0, targetPosition);
                    }
                });
            }
        });
    });

    // Page fade-out on external navigation
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function (e) {
            const isInternal = this.hostname === window.location.hostname;
            const isSamePath = this.pathname === window.location.pathname;
            const isBlank = this.target === '_blank';

            if (isInternal && !isSamePath && !isBlank) {
                e.preventDefault();
                const target = this.href;
                document.body.style.opacity = '0';
                setTimeout(() => {
                    window.location.href = target;
                }, 800);
            }
        });
    });
});
