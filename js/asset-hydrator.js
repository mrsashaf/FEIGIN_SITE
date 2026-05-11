/**
 * Asset Hydrator
 * Convention-based asset loading for index/case pages.
 * If a slot has a video file, it renders as video; otherwise as image.
 */
(function () {
    const EXTENSIONS = ['mp4', 'webm', 'png', 'jpg', 'jpeg', 'webp'];
    const VIDEO_EXTENSIONS = new Set(['mp4', 'webm']);
    const cache = new Map();
    const FIXED_EVIDENCE_SLOTS = new Set(['file-01', 'file-02', 'file-03']);

    async function fileExists(url) {
        if (cache.has(url)) return cache.get(url);
        try {
            const res = await fetch(url, { method: 'HEAD' });
            const ok = res.ok;
            cache.set(url, ok);
            return ok;
        } catch (_) {
            cache.set(url, false);
            return false;
        }
    }

    async function resolveSlot(basePath) {
        for (const ext of EXTENSIONS) {
            const candidate = `${basePath}.${ext}`;
            if (await fileExists(candidate)) {
                return { url: candidate, ext };
            }
        }
        return null;
    }

    function renderVideo(container, src) {
        const video = document.createElement('video');
        video.className = 'preview-video preview-video--cover';
        video.muted = true;
        video.loop = true;
        video.autoplay = true;
        video.playsInline = true;
        const source = document.createElement('source');
        source.src = src;
        source.type = src.endsWith('.webm') ? 'video/webm' : 'video/mp4';
        video.appendChild(source);
        container.prepend(video);
    }

    function renderImage(container, src) {
        const bg = container.querySelector('.evidence-image-bg') || document.createElement('div');
        bg.className = 'evidence-image-bg';
        bg.style.backgroundImage = `url('${src}')`;
        if (!bg.parentNode) container.prepend(bg);
    }

    async function hydrateEvidenceCards() {
        const cards = Array.from(document.querySelectorAll('[data-evidence-slot]'));
        for (const cardImage of cards) {
            if (cardImage.dataset.fixedMedia === 'true') continue;
            const slot = cardImage.dataset.evidenceSlot;
            if (!slot) continue;
            if (FIXED_EVIDENCE_SLOTS.has(slot)) continue;

            const resolved = await resolveSlot(`assets/evidence/slots/${slot}`);
            if (!resolved) continue;

            // Remove legacy media if present
            const existingVideo = cardImage.querySelector('video');
            if (existingVideo) existingVideo.remove();

            if (VIDEO_EXTENSIONS.has(resolved.ext)) {
                renderVideo(cardImage, resolved.url);
            } else {
                renderImage(cardImage, resolved.url);
            }

            cardImage.classList.add('has-real-media');
        }
    }

    async function hydrateCaseSlides() {
        const case01Img = document.getElementById('case01Image');
        if (!case01Img) return;
        const slots = ['case01-main', 'case01-slide-01', 'case01-slide-02', 'case01-slide-03'];
        const resolved = [];

        for (const slot of slots) {
            const asset = await resolveSlot(`assets/cases/slots/${slot}`);
            if (asset && !VIDEO_EXTENSIONS.has(asset.ext)) {
                resolved.push(asset.url);
            }
        }

        if (resolved.length) {
            window.FEIGIN_CASE01_SLIDES = resolved;
            case01Img.style.backgroundImage = `url('${resolved[0]}')`;
            window.dispatchEvent(new Event('feigin:case01-slides-ready'));
        }
    }

    document.addEventListener('DOMContentLoaded', async () => {
        await Promise.all([hydrateEvidenceCards(), hydrateCaseSlides()]);
    });
})();
