/**
 * Clearance Form 3-state flow
 * Used on index.html only
 */
(function () {
    const accessState = window.FEIGIN_ACCESS_STATE;
    if (!accessState) return;

    const clearanceForm = document.getElementById('clearanceForm');
    const state1 = document.getElementById('accessState1');
    const state2 = document.getElementById('accessState2');
    const state3 = document.getElementById('accessState3');
    const clearanceResponse = document.getElementById('clearanceResponse');
    const submitBtn = clearanceForm ? clearanceForm.querySelector('.access-submit') : null;
    const emailInput = clearanceForm ? clearanceForm.querySelector('input[type="email"]') : null;
    const fill = document.getElementById('progressFill');
    const pct = document.getElementById('progressPct');

    if (!clearanceForm || !state1 || !state2 || !state3) {
        return;
    }

    function setProgress(val) {
        if (fill) fill.style.width = `${val}%`;
        if (pct) pct.textContent = `${val}%`;
    }

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
                submitBtn.textContent = 'REQUEST ACCESS \u2193';
            }
            return;
        }

        state1.classList.remove('active');
        state2.classList.add('active');

        setProgress(0);
        setTimeout(() => setProgress(10), 300);
        setTimeout(() => setProgress(25), 700);
        setTimeout(() => setProgress(40), 1100);
        setTimeout(() => setProgress(64), 1600);
        setTimeout(() => setProgress(78), 2200);
        setTimeout(() => setProgress(91), 2600);
        setTimeout(() => setProgress(100), 3000);

        setTimeout(() => {
            accessState.grantLevel2();

            state2.classList.remove('active');
            state3.classList.add('active');

            if (clearanceResponse) {
                clearanceResponse.textContent = 'CLEARANCE REQUEST RECEIVED. CHECK YOUR EMAIL.';
            }
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'REQUEST ACCESS \u2193';
            }
        }, 3400);
    });
})();

