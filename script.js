/* ═══════════════════════════════════════════════════════
   Grainnatech Holdings Ltd — Website Script
   ═══════════════════════════════════════════════════════ */

const API_BASE = 'https://api.grainnatechholdingsltd.eu';

// ─── Navigation ──────────────────────────────────────

const nav      = document.getElementById('nav');
const toggle   = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  nav.classList.toggle('nav--scrolled', window.scrollY > 40);
});

toggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ─── Platform Status ─────────────────────────────────

async function fetchApi(path) {
  try {
    const r = await fetch(`${API_BASE}${path}`);
    return r.ok ? await r.json() : null;
  } catch {
    return null;
  }
}

function setStatus(id, text, cls) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = text;
  el.className   = 'status-card__value ' + (cls || '');
}

function renderGroupsList(groups) {
  const el = document.getElementById('groupsList');
  if (!el) return;
  if (!groups?.length) {
    el.innerHTML = '<p class="dashboard-empty">Unavailable</p>';
    return;
  }
  el.innerHTML = '<table class="dashboard-table"><thead><tr><th>ID</th><th>Name</th></tr></thead><tbody>' +
    groups.map(g => `<tr><td><code>${g.id}</code></td><td>${g.name}</td></tr>`).join('') +
    '</tbody></table>';
}

function renderCouncilsList(councils) {
  const el = document.getElementById('councilsList');
  if (!el) return;
  if (!councils?.length) {
    el.innerHTML = '<p class="dashboard-empty">Unavailable</p>';
    return;
  }
  el.innerHTML = '<table class="dashboard-table"><thead><tr><th>ID</th><th>Name</th><th>Status</th></tr></thead><tbody>' +
    councils.map(c => `<tr><td><code>${c.id}</code></td><td>${c.name}</td><td><span class="badge badge--${c.status || 'active'}">${c.status || 'active'}</span></td></tr>`).join('') +
    '</tbody></table>';
}

async function refreshStatus() {
  const health = await fetchApi('/health');
  if (health !== null) {
    setStatus('statusHealth', 'Operational', 'ok');
  } else {
    setStatus('statusHealth', 'Unreachable', 'error');
  }

  const groups = await fetchApi('/groups');
  if (groups?.groups) {
    setStatus('statusGroups', `${groups.groups.length} registered`, 'ok');
    renderGroupsList(groups.groups);
  } else {
    setStatus('statusGroups', 'Unavailable', 'warn');
    renderGroupsList(null);
  }

  const councils = await fetchApi('/councils');
  if (councils?.councils) {
    renderCouncilsList(councils.councils);
  } else {
    renderCouncilsList(null);
  }

  const gov = await fetchApi('/governance');
  if (gov) {
    setStatus('statusGovernance', 'Active', 'ok');
    setStatus('statusEvidence', gov.evidence_entries ?? '—', gov.evidence_entries ? 'ok' : 'warn');
  } else {
    setStatus('statusGovernance', 'Unavailable', 'warn');
    setStatus('statusEvidence', '—', 'warn');
  }
}

refreshStatus();

// ─── Smooth Reveal on Scroll ─────────────────────────

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.card, .status-card').forEach(el => {
  el.style.opacity   = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

document.head.insertAdjacentHTML('beforeend', `
  <style>.visible { opacity: 1 !important; transform: translateY(0) !important; }</style>
`);
