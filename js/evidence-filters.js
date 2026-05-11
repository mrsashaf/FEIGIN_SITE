/**
 * Evidence Filters + Load More + Clearance Form
 * Used on index.html only
 */
(function () {
    // === EVIDENCE FILTERS ===
    const filterBtns = document.querySelectorAll('.evidence-filter');
    const allCards = document.querySelectorAll('.evidence-card');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    let activeFilter = null;
    let isExpanded = false;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const clickedFilter = btn.dataset.filter;
            if (activeFilter === clickedFilter) {
                activeFilter = null;
                filterBtns.forEach(b => b.classList.remove('active'));
            } else {
                activeFilter = clickedFilter;
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            }
            // Reset to collapsed when filter changes
            if (isExpanded) {
                isExpanded = false;
                loadMoreBtn.textContent = '> LOAD MORE DATA';
                loadMoreBtn.classList.remove('expanded');
            }
            applyFilter();
        });
    });

    function applyFilter() {
        let visibleCount = 0;
        const isMobile = window.innerWidth <= 768;
        let hasMoreToLoad = false;

        allCards.forEach(card => {
            const cat = card.dataset.category;

            // 1. Filter out by category
            if (activeFilter && cat !== activeFilter) {
                card.classList.add('filtered-out');
                card.classList.remove('mobile-hidden');
                return;
            } else {
                card.classList.remove('filtered-out');
            }

            // 2. Handle expanded/collapsed state
            if (isExpanded) {
                card.classList.remove('hidden');
                card.classList.remove('mobile-hidden');
            } else {
                // Collapsed state
                if (card.dataset.initialHidden === 'true') {
                    card.classList.add('hidden');
                } else {
                    card.classList.remove('hidden');

                    // Mobile limit logic: only show 3 visible cards on mobile when collapsed
                    if (isMobile) {
                        if (visibleCount >= 3) {
                            card.classList.add('mobile-hidden');
                        } else {
                            card.classList.remove('mobile-hidden');
                            visibleCount++;
                        }
                    } else {
                        card.classList.remove('mobile-hidden');
                    }
                }
            }
        });

        // Also check if any card is hidden in the current filter to show/hide the LOAD MORE button
        if (!isExpanded) {
            allCards.forEach(card => {
                if (!card.classList.contains('filtered-out') && (card.dataset.initialHidden === 'true' || card.classList.contains('mobile-hidden'))) {
                    hasMoreToLoad = true;
                }
            });
        }

        const loadMoreContainer = document.querySelector('.load-more-container');
        if (loadMoreContainer) {
            if (hasMoreToLoad || isExpanded) {
                loadMoreContainer.style.display = 'block';
            } else {
                loadMoreContainer.style.display = 'none';
            }
        }
    }

    window.addEventListener('resize', applyFilter);

    // Mark initially hidden cards
    allCards.forEach(card => {
        if (card.classList.contains('hidden')) {
            card.dataset.initialHidden = 'true';
        }
    });

    // === LOAD MORE / SHOW LESS TOGGLE ===
    loadMoreBtn.addEventListener('click', () => {
        if (!isExpanded) {
            // EXPAND: show hidden cards
            allCards.forEach(card => {
                if (card.dataset.initialHidden === 'true') {
                    card.classList.remove('hidden');
                }
            });
            isExpanded = true;
            loadMoreBtn.textContent = '> SHOW LESS';
            loadMoreBtn.classList.add('expanded');

            // Scroll to last visible card
            setTimeout(() => {
                const visibleCards = document.querySelectorAll('.evidence-card:not(.filtered-out):not(.hidden)');
                const lastCard = visibleCards[visibleCards.length - 1];
                if (lastCard) {
                    lastCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);
        } else {
            // COLLAPSE: hide extra cards
            allCards.forEach(card => {
                if (card.dataset.initialHidden === 'true') {
                    card.classList.add('hidden');
                }
            });
            isExpanded = false;
            loadMoreBtn.textContent = '> LOAD MORE DATA';
            loadMoreBtn.classList.remove('expanded');

            // Scroll back to evidence header
            document.querySelector('.evidence-header').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

    // Initial state
    applyFilter();

    // === CLEARANCE FORM — 3 STATE FLOW ===
    const clearanceForm = document.getElementById('clearanceForm');
    const state1 = document.getElementById('accessState1');
    const state2 = document.getElementById('accessState2');
    const state3 = document.getElementById('accessState3');
    const clearanceResponse = document.getElementById('clearanceResponse');
    const submitBtn = clearanceForm ? clearanceForm.querySelector('.access-submit') : null;
    const emailInput = clearanceForm ? clearanceForm.querySelector('input[type="email"]') : null;

    if (clearanceForm && state1 && state2 && state3) {
        clearanceForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = emailInput ? emailInput.value.trim() : '';
            if (!email) return;

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'PROCESSING...';
            }

            if (clearanceResponse) {
                clearanceResponse.textContent = '';
            }

            let requestOk = false;
            try {
                const resp = await fetch('/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email })
                });
                const data = await resp.json().catch(() => ({}));
                requestOk = !!(resp.ok && data && data.success);
            } catch (_) {
                requestOk = false;
            }

            if (!requestOk) {
                if (clearanceResponse) {
                    clearanceResponse.textContent = 'TRANSMISSION FAILED. TRY AGAIN.';
                }
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'REQUEST ACCESS ↓';
                }
                return;
            }

            const fill = document.getElementById('progressFill');
            const pct = document.getElementById('progressPct');

            // Switch to STATE 2
            state1.classList.remove('active');
            state2.classList.add('active');

            function setProgress(val) {
                if (fill) fill.style.width = val + '%';
                if (pct) pct.textContent = val + '%';
            }

            // Gradual progress: 0 → 64
            setProgress(0);
            setTimeout(() => setProgress(10), 300);
            setTimeout(() => setProgress(25), 700);
            setTimeout(() => setProgress(40), 1100);
            setTimeout(() => setProgress(64), 1600);

            // Hold at 64%, then continue to 100
            setTimeout(() => setProgress(78), 2200);
            setTimeout(() => setProgress(91), 2600);
            setTimeout(() => setProgress(100), 3000);

            // Switch to STATE 3 after reaching 100
            setTimeout(() => {
                if (window.FEIGIN_CLEARANCE && typeof window.FEIGIN_CLEARANCE.grantLevel2 === 'function') {
                    window.FEIGIN_CLEARANCE.grantLevel2();
                }
                window.hasLevel2Access = true;
                window.dispatchEvent(new Event('feigin:clearance-granted'));

                state2.classList.remove('active');
                state3.classList.add('active');
                if (clearanceResponse) {
                    clearanceResponse.textContent = 'CLEARANCE REQUEST RECEIVED. CHECK YOUR EMAIL.';
                }
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'REQUEST ACCESS ↓';
                }
            }, 3400);
        });
    }
})();
