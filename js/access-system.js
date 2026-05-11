/**
 * Access System — card click handling, preview modals, typewriter effect
 * Used on index.html only
 */
document.addEventListener('DOMContentLoaded', () => {
    const DECRYPTION_TIMER_KEY = 'aberration_decryption_deadline_ms';
    const DECRYPTION_WINDOW_MS = 14 * 24 * 60 * 60 * 1000;

    const fromStorage = window.FEIGIN_CLEARANCE && window.FEIGIN_CLEARANCE.hasLevel2();
    if (typeof window.hasLevel2Access !== 'boolean') {
        window.hasLevel2Access = !!fromStorage;
    }

    // Keep FILE_00 teaser video always running in muted loop.
    const file00Video = document.querySelector('.evidence-card[data-category="analyst"][data-access="public"] .preview-video');
    if (file00Video) {
        file00Video.muted = true;
        file00Video.loop = true;
        file00Video.autoplay = true;
        file00Video.playsInline = true;
        file00Video.setAttribute('muted', '');
        file00Video.setAttribute('loop', '');
        file00Video.setAttribute('autoplay', '');
        file00Video.setAttribute('playsinline', '');

        const tryPlay = () => file00Video.play().catch(() => { });
        file00Video.addEventListener('loadeddata', tryPlay);
        file00Video.addEventListener('canplay', tryPlay);
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) tryPlay();
        });
        tryPlay();
    }

    // Normalize backgrounds to avoid blurring the container
    document.querySelectorAll('.evidence-image.placeholder').forEach(imgBox => {
        const bg = imgBox.style.backgroundImage;
        if (bg && bg !== 'none' && !imgBox.querySelector('.evidence-image-bg')) {
            imgBox.style.backgroundImage = 'none';
            const bgDiv = document.createElement('div');
            bgDiv.className = 'evidence-image-bg';
            bgDiv.style.backgroundImage = bg;
            imgBox.insertBefore(bgDiv, imgBox.firstChild);
        }
    });

    const cards = document.querySelectorAll('.evidence-card, .case-card--locked');
    const overlay = document.getElementById('accessModalOverlay');
    const modalPublic = document.getElementById('modalPublic');
    const previewContainer = document.getElementById('previewMediaContainer');

    let activeOverlayCard = null;
    let activeOverlayTimer = null;
    let activeCountdownInterval = null;

    function closePreview() {
        overlay.style.display = 'none';
        modalPublic.style.display = 'none';
        previewContainer.innerHTML = '';
        document.body.style.overflow = '';
    }

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const access = card.dataset.access;

            if (access === 'public' || (access === 'level-2' && window.hasLevel2Access)) {
                triggerInCardWarning(card, 'decrypting');
            } else if (access === 'level-2') {
                triggerInCardWarning(card, 'level-2');
            } else if (access === 'sealed') {
                triggerInCardWarning(card, 'sealed');
            }
        });
    });

    const case02AccessBtn = document.querySelector('.js-case02-access-btn');
    const case02Card = document.getElementById('case02Card');
    if (case02AccessBtn && case02Card) {
        function smoothScrollToCardThenWarn(targetCard, cb) {
            const targetY = targetCard.getBoundingClientRect().top + window.scrollY - (window.innerHeight * 0.5) + (targetCard.offsetHeight * 0.5);
            let stableTicks = 0;
            let lastY = window.scrollY;
            let rafId = null;
            let done = false;

            function finish() {
                if (done) return;
                done = true;
                if (rafId) cancelAnimationFrame(rafId);
                cb();
            }

            function watchScrollEnd() {
                const currentY = window.scrollY;
                const delta = Math.abs(currentY - lastY);
                const dist = Math.abs(targetY - currentY);
                lastY = currentY;

                if (delta < 0.8 || dist < 2) {
                    stableTicks += 1;
                } else {
                    stableTicks = 0;
                }

                if (stableTicks >= 8 || dist < 2) {
                    finish();
                    return;
                }

                rafId = requestAnimationFrame(watchScrollEnd);
            }

            targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            rafId = requestAnimationFrame(watchScrollEnd);
            setTimeout(finish, 1800);
        }

        case02AccessBtn.addEventListener('click', (e) => {
            if (window.hasLevel2Access) {
                return;
            }
            e.preventDefault();
            e.stopPropagation();
            smoothScrollToCardThenWarn(case02Card, () => {
                triggerInCardWarning(case02Card, 'level-2');
            });
        });

        case02AccessBtn.addEventListener('mousedown', (e) => {
            e.preventDefault();
        });
    }

    function triggerInCardWarning(card, type) {
        if (activeOverlayCard && activeOverlayCard !== card) {
            clearInCardWarning(activeOverlayCard);
        }

        if (card.classList.contains('is-warning-active')) {
            clearInCardWarning(card);
        }

        card.classList.add('is-warning-active');
        activeOverlayCard = card;

        const statusLabel = card.querySelector('.system-status-label');
        const imgBox = card.querySelector('.evidence-image') || card.querySelector('.case-image--classified');

        let stampText = '[ ACCESS DENIED ]';
        if (type === 'sealed') {
            // check if it's decrypting
            const meta = card.querySelector('.evidence-meta');
            if (meta && meta.textContent.includes('DECRYPTING')) {
                stampText = '[ DECRYPTING... ]';
            } else {
                stampText = '[ FILE SEALED ]';
            }
        } else if (type === 'decrypting') {
            stampText = '[ DECRYPTION IN PROGRESS ]';
        }

        showSystemAction(statusLabel, stampText, () => {
            const warningOverlay = document.createElement('div');
            warningOverlay.className = 'access-warning-overlay flicker';

            if (type === 'decrypting') {
                card.classList.add('is-sealed-active');
                warningOverlay.innerHTML = `
                    <h3>FILE DECRYPTION<br>IN PROGRESS</h3>
                    <p class="js-decryption-timer">Decrypted file will be available in 14 days.</p>
                    <button class="btn-steam--outline incard-request-btn" style="width: auto">UNDERSTOOD &darr;</button>
                `;
            } else if (type === 'level-2') {
                card.classList.add('is-denied-active');
                warningOverlay.innerHTML = `
                    <h3>UNAUTHORIZED<br>ACCESS</h3>
                    <p>This file is still encrypted.<br>Decrypted content will become<br>available in coming days.</p>
                    <button class="btn-steam--outline incard-request-btn" style="width: auto">REQUEST ACCESS &darr;</button>
                `;
            } else {
                card.classList.add('is-sealed-active');
                warningOverlay.innerHTML = `
                    <h3>FILE SEALED</h3>
                    <p>This file is sealed under PRISM authority.<br>No clearance path exists.</p>
                    <button class="btn-steam--outline incard-request-btn" style="width: auto">REQUEST ACCESS &darr;</button>
                `;
            }

            imgBox.appendChild(warningOverlay);
            if (type === 'decrypting') {
                startDecryptionCountdown(warningOverlay);
            }

            setTimeout(() => warningOverlay.classList.remove('flicker'), 400);

            const reqBtn = warningOverlay.querySelector('.incard-request-btn');
            if (reqBtn) {
                reqBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    clearInCardWarning(card);
                    if (type === 'decrypting') {
                        return;
                    }
                    const target = document.getElementById('clearance-level-2') || document.getElementById('clearance');
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            }

            activeOverlayTimer = setTimeout(() => {
                clearInCardWarning(card);
            }, 5000);
        });
    }

    function clearInCardWarning(card) {
        if (!card) return;
        card.classList.remove('is-warning-active', 'is-denied-active', 'is-sealed-active');
        const warningOverlay = card.querySelector('.access-warning-overlay');

        if (warningOverlay) {
            warningOverlay.classList.add('flicker');
            setTimeout(() => {
                if (warningOverlay.parentNode) warningOverlay.parentNode.removeChild(warningOverlay);
            }, 400);
        }

        if (activeOverlayTimer) {
            clearTimeout(activeOverlayTimer);
            activeOverlayTimer = null;
        }
        if (activeCountdownInterval) {
            clearInterval(activeCountdownInterval);
            activeCountdownInterval = null;
        }

        const statusLabel = card.querySelector('.system-status-label');
        if (statusLabel) {
            statusLabel.style.display = 'block';
            statusLabel.classList.remove('flicker');
        }
        activeOverlayCard = null;
    }

    function getDecryptionDeadline() {
        const raw = localStorage.getItem(DECRYPTION_TIMER_KEY);
        const parsed = raw ? Number(raw) : NaN;
        if (Number.isFinite(parsed) && parsed > Date.now()) {
            return parsed;
        }
        const deadline = Date.now() + DECRYPTION_WINDOW_MS;
        localStorage.setItem(DECRYPTION_TIMER_KEY, String(deadline));
        return deadline;
    }

    function formatRemaining(ms) {
        if (ms <= 0) return '0d 0h 0m 0s';
        const totalSec = Math.floor(ms / 1000);
        const days = Math.floor(totalSec / 86400);
        const hours = Math.floor((totalSec % 86400) / 3600);
        const minutes = Math.floor((totalSec % 3600) / 60);
        const seconds = totalSec % 60;
        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    function startDecryptionCountdown(overlayEl) {
        const timerEl = overlayEl.querySelector('.js-decryption-timer');
        if (!timerEl) return;
        const deadline = getDecryptionDeadline();

        function tick() {
            const left = deadline - Date.now();
            timerEl.textContent = `Decrypted file will be available in ${formatRemaining(left)}.`;
        }

        tick();
        if (activeCountdownInterval) {
            clearInterval(activeCountdownInterval);
        }
        activeCountdownInterval = setInterval(tick, 1000);
    }

    function showSystemAction(label, text, callback) {
        if (!label) return callback();
        label.textContent = text;
        label.style.display = 'block';
        label.classList.add('flicker');

        setTimeout(() => {
            label.classList.remove('flicker');
            label.style.display = 'none';
            callback();
        }, 400);
    }

    function openPreview(card) {
        const video = card.querySelector('video');
        const imageBox = card.querySelector('.evidence-image-bg') || card.querySelector('.evidence-image') || card.querySelector('.case-image-bg');
        const bgImage = imageBox ? imageBox.style.backgroundImage : '';

        previewContainer.innerHTML = '';

        if (video) {
            const newVideo = document.createElement('video');
            newVideo.src = video.querySelector('source').src;
            newVideo.autoplay = true;
            newVideo.loop = true;
            newVideo.muted = false;
            newVideo.playsInline = true;
            previewContainer.appendChild(newVideo);
        } else if (bgImage && bgImage !== 'none') {
            const url = bgImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
            const newImg = document.createElement('img');
            newImg.src = url;
            previewContainer.appendChild(newImg);
        }

        overlay.style.display = 'flex';
        modalPublic.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Set hasLevel2Access on clearance form submit
    const clearanceForm = document.getElementById('clearanceForm');
    if (clearanceForm) {
        clearanceForm.addEventListener('submit', (e) => {
            setTimeout(() => {
                if (window.FEIGIN_CLEARANCE && window.FEIGIN_CLEARANCE.hasLevel2()) {
                    window.hasLevel2Access = true;
                }
            }, 3500);
        });
    }

    // Close modal handlers
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closePreview();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closePreview();
    });

    // === TYPEWRITER EFFECT ===
    const typewriterPhrases = [
        "[ABERRATION] is a classified horror anthology.",
        "Reality is not stable.",
        "Fear leaves evidence.",
        "Some cases should not be reopened.",
        "Do not trust the recording.",
        "The archive is still watching.",
        "Cases of things that should not exist.",
        "Every file was recovered for a reason."
    ];

    const subtitleEl = document.getElementById('heroSubtitleTypewriter');
    if (subtitleEl) {
        let currentPhraseIndex = 0;
        let isDeleting = false;
        let currentText = typewriterPhrases[0];
        let charIndex = currentText.length;

        subtitleEl.innerHTML = currentText + '<span class="typewriter-cursor">|</span>';

        setTimeout(typewriterLoop, 3000);

        function typewriterLoop() {
            const currentPhrase = typewriterPhrases[currentPhraseIndex];

            if (isDeleting) {
                currentText = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                currentText = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }

            subtitleEl.innerHTML = currentText + '<span class="typewriter-cursor">|</span>';

            let typingSpeed = isDeleting ? 35 : 55;
            if (!isDeleting) typingSpeed += Math.random() * 20;

            if (!isDeleting && currentText === currentPhrase) {
                isDeleting = true;
                setTimeout(typewriterLoop, 2500);
            } else if (isDeleting && currentText === "") {
                isDeleting = false;

                let nextIndex;
                do {
                    nextIndex = Math.floor(Math.random() * typewriterPhrases.length);
                } while (nextIndex === currentPhraseIndex);

                currentPhraseIndex = nextIndex;
                setTimeout(typewriterLoop, 500);
            } else {
                setTimeout(typewriterLoop, typingSpeed);
            }
        }
    }
});
