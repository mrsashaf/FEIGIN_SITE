window.FEIGIN_CLEARANCE = {
  hasLevel2() {
    return localStorage.getItem('aberration_clearance_level') === '2';
  },
  grantLevel2() {
    localStorage.setItem('aberration_clearance_level', '2');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  function applyLevel2AccessUI() {
    window.hasLevel2Access = true;

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
      case02Btn.textContent = 'OPEN COMFORT ZONE ↓';
      case02Btn.setAttribute('href', 'censored.html');
    }
  }

  const hasLevel2 = window.FEIGIN_CLEARANCE.hasLevel2();
  window.hasLevel2Access = hasLevel2;

  if (document.body.classList.contains('case-page') && document.body.classList.contains('censored-page')) {
    if (!hasLevel2) {
      window.location.href = 'index.html#clearance';
      return;
    }
  }

  if (hasLevel2) {
    applyLevel2AccessUI();
  }

  window.addEventListener('feigin:clearance-granted', applyLevel2AccessUI);
});
