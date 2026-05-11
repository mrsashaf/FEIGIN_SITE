/**
 * Evidence Filters + Load More
 * Used on index.html only
 */
(function () {
    const filterBtns = document.querySelectorAll('.evidence-filter');
    const allCards = document.querySelectorAll('.evidence-card');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    let activeFilter = null;
    let isExpanded = false;

    if (!loadMoreBtn) {
        return;
    }

    filterBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            const clickedFilter = btn.dataset.filter;
            if (activeFilter === clickedFilter) {
                activeFilter = null;
                filterBtns.forEach((b) => b.classList.remove('active'));
            } else {
                activeFilter = clickedFilter;
                filterBtns.forEach((b) => b.classList.remove('active'));
                btn.classList.add('active');
            }

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

        allCards.forEach((card) => {
            const cat = card.dataset.category;

            if (activeFilter && cat !== activeFilter) {
                card.classList.add('filtered-out');
                card.classList.remove('mobile-hidden');
                return;
            }
            card.classList.remove('filtered-out');

            if (isExpanded) {
                card.classList.remove('hidden');
                card.classList.remove('mobile-hidden');
                return;
            }

            if (card.dataset.initialHidden === 'true') {
                card.classList.add('hidden');
                return;
            }

            card.classList.remove('hidden');
            if (!isMobile) {
                card.classList.remove('mobile-hidden');
                return;
            }

            if (visibleCount >= 3) {
                card.classList.add('mobile-hidden');
            } else {
                card.classList.remove('mobile-hidden');
                visibleCount++;
            }
        });

        if (!isExpanded) {
            allCards.forEach((card) => {
                if (!card.classList.contains('filtered-out') && (card.dataset.initialHidden === 'true' || card.classList.contains('mobile-hidden'))) {
                    hasMoreToLoad = true;
                }
            });
        }

        const loadMoreContainer = document.querySelector('.load-more-container');
        if (!loadMoreContainer) {
            return;
        }

        loadMoreContainer.style.display = hasMoreToLoad || isExpanded ? 'block' : 'none';
    }

    window.addEventListener('resize', applyFilter);

    allCards.forEach((card) => {
        if (card.classList.contains('hidden')) {
            card.dataset.initialHidden = 'true';
        }
    });

    loadMoreBtn.addEventListener('click', () => {
        if (!isExpanded) {
            allCards.forEach((card) => {
                if (card.dataset.initialHidden === 'true') {
                    card.classList.remove('hidden');
                }
            });
            isExpanded = true;
            loadMoreBtn.textContent = '> SHOW LESS';
            loadMoreBtn.classList.add('expanded');

            setTimeout(() => {
                const visibleCards = document.querySelectorAll('.evidence-card:not(.filtered-out):not(.hidden)');
                const lastCard = visibleCards[visibleCards.length - 1];
                if (lastCard) {
                    lastCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);
            return;
        }

        allCards.forEach((card) => {
            if (card.dataset.initialHidden === 'true') {
                card.classList.add('hidden');
            }
        });
        isExpanded = false;
        loadMoreBtn.textContent = '> LOAD MORE DATA';
        loadMoreBtn.classList.remove('expanded');

        const evidenceHeader = document.querySelector('.evidence-header');
        if (evidenceHeader) {
            evidenceHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

    applyFilter();
})();
