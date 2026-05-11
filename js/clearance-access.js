document.addEventListener('DOMContentLoaded', () => {
  const accessState = window.FEIGIN_ACCESS_STATE;
  if (!accessState) return;

  function applyLevel2AccessUI() {
    document.querySelectorAll('.evidence-card[data-access="level-2"], .case-card--locked').forEach((card) => {
      if (card.classList.contains('evidence-card')) {
        card.dataset.access = 'public';
      }

      card.dataset.redirectUrl = 'censored.html';
      card.classList.add('is-access-granted');
      card.classList.remove('blurred', 'case-card--locked');

      card.querySelectorAll('.evidence-meta').forEach((meta) => {
        if (/CLEARANCE REQUIRED|ENCRYPTED|CENSORED|DECRYPTING/i.test(meta.textContent)) {
          meta.textContent = '[ ACCESS GRANTED ]';
        }
      });

      card.querySelectorAll('.system-status-label').forEach((label) => {
        label.textContent = '[ ACCESS GRANTED ]';
      });
    });

    const case02Btn = document.querySelector('.js-case02-access-btn');
    if (case02Btn) {
      case02Btn.textContent = 'OPEN COMFORT ZONE \u2193';
      case02Btn.setAttribute('href', 'censored.html');
    }
  }

  const hasLevel2 = accessState.hasLevel2();

  if (document.body.classList.contains('case-page') && document.body.classList.contains('censored-page')) {
    if (!hasLevel2) {
      window.location.href = 'index.html#clearance';
      return;
    }
  }

  if (hasLevel2) {
    applyLevel2AccessUI();
  }

  accessState.onChange(applyLevel2AccessUI);
});

