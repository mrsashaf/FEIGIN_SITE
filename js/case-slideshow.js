/**
 * Case 01 Image Slideshow
 * Used on index.html only
 */
(function () {
    const case01Img = document.getElementById('case01Image');
    if (!case01Img) return;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    let slides = window.FEIGIN_CASE01_SLIDES || [
        'assets/cases/case-01-analyst/main-capsule.png',
        'assets/cases/case-01-analyst/gallery/01.png',
        'assets/cases/case-01-analyst/gallery/02.png',
        'assets/cases/case-01-analyst/gallery/03.png'
    ];

    if (isMobile) {
        slides = ['assets/cases/mobile/case-01-analyst-mobile.png'];
    }
    let current = 0;
    let intervalId = null;

    function showSlide(index) {
        current = index;
        case01Img.style.backgroundImage = "url('" + slides[current] + "')";
    }

    function nextSlide() {
        showSlide((current + 1) % slides.length);
    }

    function prevSlide() {
        showSlide((current - 1 + slides.length) % slides.length);
    }

    // Nav arrows
    const prevBtn = case01Img.parentElement.querySelector('.case-meta-nav-btn--prev');
    const nextBtn = case01Img.parentElement.querySelector('.case-meta-nav-btn--next');
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetInterval(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetInterval(); });

    function resetInterval() {
        if (intervalId) clearInterval(intervalId);
        intervalId = setInterval(nextSlide, 4000);
    }

    // Start cycling when card is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                resetInterval();
            } else {
                if (intervalId) { clearInterval(intervalId); intervalId = null; }
            }
        });
    }, { threshold: 0.3 });

    observer.observe(case01Img);

    // Preload images
    slides.forEach(src => { const img = new Image(); img.src = src; });

    window.addEventListener('feigin:case01-slides-ready', () => {
        if (isMobile) return;
        if (Array.isArray(window.FEIGIN_CASE01_SLIDES) && window.FEIGIN_CASE01_SLIDES.length) {
            slides = window.FEIGIN_CASE01_SLIDES;
            current = 0;
            showSlide(0);
            slides.forEach(src => { const img = new Image(); img.src = src; });
            resetInterval();
        }
    });
})();
