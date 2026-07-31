/**
 * Workflowware entitlements gate.
 * Free tier + Pro paid wall for platform pages.
 * Demo session in localStorage until Runtime /v1/who is wired.
 */
(function () {
  const STORAGE_KEY = 'ww_session_v1';
  const RANK = { anonymous: 0, free: 1, pro: 2 };

  const DEFAULT_ENTITLEMENTS = {
    routes: {
      'app.html': { min_tier: 'free', mode: 'preview_on_free' },
      'app-library.html': { min_tier: 'free', mode: 'browse_on_free' },
      'app-marketplace.html': { min_tier: 'pro' },
      'app-builder.html': { min_tier: 'pro' }
    },
    features: {
      lab_full: { min_tier: 'pro' },
      marketplace: { min_tier: 'pro' },
      builder: { min_tier: 'pro' },
      create_workflow: { min_tier: 'pro' },
      install_actions: { min_tier: 'pro' },
      open_command_center: { min_tier: 'pro' }
    }
  };

  let entitlements = DEFAULT_ENTITLEMENTS;

  function pageName() {
    const parts = location.pathname.split('/');
    return parts[parts.length - 1] || 'index.html';
  }

  function readSession() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (_) {
      return null;
    }
  }

  function writeSession(session) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    return session;
  }

  function ensureFreeSession() {
    let s = readSession();
    if (s && (s.tier === 'free' || s.tier === 'pro')) return s;
    s = {
      tier: 'free',
      email: null,
      source: 'local_demo',
      created_at: new Date().toISOString(),
      note: 'Demo free session. Runtime will replace this.'
    };
    return writeSession(s);
  }

  function setTier(tier, email) {
    const s = {
      tier,
      email: email || (readSession() && readSession().email) || null,
      source: tier === 'pro' ? 'local_demo_upgrade' : 'local_demo',
      created_at: (readSession() && readSession().created_at) || new Date().toISOString(),
      upgraded_at: tier === 'pro' ? new Date().toISOString() : undefined,
      note: tier === 'pro'
        ? 'Local operator override — not payment. Runtime entitlements replace this.'
        : 'Open / preview session.'
    };
    return writeSession(s);
  }

  function tierRank(t) {
    return RANK[t] || 0;
  }

  function hasTier(need) {
    const s = readSession() || { tier: 'anonymous' };
    return tierRank(s.tier) >= tierRank(need);
  }

  function canFeature(featureId) {
    const f = (entitlements.features || {})[featureId];
    if (!f) return true;
    return hasTier(f.min_tier || 'free');
  }

  function injectStyles() {
    if (document.getElementById('ww-entitlements-css')) return;
    const css = document.createElement('style');
    css.id = 'ww-entitlements-css';
    css.textContent = `
      .ww-paywall{position:fixed;inset:0;z-index:1000;background:rgba(16,20,28,.55);display:grid;place-items:center;padding:20px;backdrop-filter:blur(6px)}
      .ww-paywall-card{width:min(440px,100%);background:#fff;border:1px solid #d7dde5;border-radius:14px;padding:22px 22px 18px;box-shadow:0 24px 60px rgba(16,20,28,.22);font-family:Sora,system-ui,sans-serif;color:#10141c}
      .ww-paywall-card h2{margin:0 0 8px;font-size:1.25rem;letter-spacing:-.02em}
      .ww-paywall-card p{margin:0 0 10px;color:#5c6775;font-size:.9rem;line-height:1.45}
      .ww-paywall-card ul{margin:0 0 14px;padding-left:1.1rem;color:#5c6775;font-size:.85rem;line-height:1.45}
      .ww-paywall-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}
      .ww-paywall-actions a,.ww-paywall-actions button{height:38px;padding:0 14px;border-radius:8px;border:1px solid #10141c;background:transparent;font:700 .72rem Sora,system-ui,sans-serif;text-transform:uppercase;letter-spacing:.04em;cursor:pointer;display:inline-flex;align-items:center;text-decoration:none;color:#10141c}
      .ww-paywall-actions .primary{background:#121826;color:#fff;border-color:#121826}
      .ww-paywall-actions .lime{background:#c8f542;border-color:#a8d12a;color:#121826}
      .ww-tier-chip{display:inline-flex;align-items:center;gap:6px;height:28px;padding:0 10px;border-radius:999px;border:1px solid #d7dde5;background:#fff;font:700 .65rem Sora,system-ui,sans-serif;text-transform:uppercase;letter-spacing:.04em}
      .ww-tier-chip.pro{background:rgba(200,245,66,.35);border-color:#a8d12a}
      .ww-tier-chip.free{background:#f3f5f8}
      .ww-locked{position:relative}
      .ww-locked::after{content:"Governed";position:absolute;top:8px;right:8px;background:#121826;color:#c8f542;font:700 9px Sora,system-ui,sans-serif;padding:3px 7px;border-radius:999px;letter-spacing:.06em;text-transform:uppercase}
      [data-ww-requires="pro"].ww-is-locked{opacity:.55;pointer-events:none;filter:grayscale(.15)}
      .ww-banner-free{margin:0 0 12px;padding:10px 12px;border-radius:8px;background:rgba(200,245,66,.18);border:1px solid #c5df7a;font-size:.78rem}
    `;
    document.head.appendChild(css);
  }

  function showPaywall(opts) {
    injectStyles();
    const existing = document.getElementById('ww-paywall');
    if (existing) existing.remove();

    const root = document.createElement('div');
    root.id = 'ww-paywall';
    root.className = 'ww-paywall';
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'true');
    root.setAttribute('aria-labelledby', 'ww-paywall-title');
    const isLocal = ['127.0.0.1', 'localhost'].includes(location.hostname);
    root.innerHTML = `
      <div class="ww-paywall-card">
        <h2 id="ww-paywall-title">${opts.title || 'Governed access required'}</h2>
        <p>${opts.body || 'This surface is part of a paid, scoped install — not the open standard.'}</p>
        <ul>
          <li><strong>Open</strong> — Spec, docs, public library, pilot, Lab preview</li>
          <li><strong>Governed</strong> — Builder, marketplace install path, full Lab (after agreement)</li>
        </ul>
        <p style="font-size:.78rem">There is no self-serve checkout here. Price follows the workflow after review.</p>
        <div class="ww-paywall-actions">
          <a class="primary" href="mailto:hello@workflowware.org?subject=Workflowware%20governed%20install">Email to begin</a>
          <a href="pricing.html">Access</a>
          <a href="${opts.fallback || 'app.html'}">Back to Lab preview</a>
          ${isLocal ? '<button type="button" class="lime" data-ww-operator>Operator override (local only)</button>' : ''}
        </div>
      </div>
    `;
    document.body.appendChild(root);
    const op = root.querySelector('[data-ww-operator]');
    if (op) {
      op.addEventListener('click', () => {
        setTier('pro');
        location.reload();
      });
    }
  }

  function applyFeatureLocks() {
    injectStyles();
    document.querySelectorAll('[data-ww-requires]').forEach((el) => {
      const need = el.getAttribute('data-ww-requires');
      if (hasTier(need)) {
        el.classList.remove('ww-is-locked');
        return;
      }
      el.classList.add('ww-is-locked');
      el.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        showPaywall({
          title: 'Governed access required',
          body: 'That action is not part of the open standard.',
          fallback: 'app.html'
        });
      }, true);
    });
  }

  function mountTierChip() {
    injectStyles();
    const host = document.querySelector('[data-ww-tier-chip]') || document.querySelector('.pc-actions');
    if (!host) return;
    const s = readSession() || { tier: 'anonymous' };
    const chip = document.createElement('a');
    chip.href = 'pricing.html';
    chip.className = 'ww-tier-chip ' + (s.tier === 'pro' ? 'pro' : 'free');
    chip.textContent = s.tier === 'pro' ? 'Operator' : 'Open';
    chip.title = s.note || 'Access';
    host.prepend(chip);

    if (s.tier === 'pro' && ['127.0.0.1', 'localhost'].includes(location.hostname)) {
      const reset = document.createElement('button');
      reset.type = 'button';
      reset.className = 'pc-btn';
      reset.style.fontSize = '0.65rem';
      reset.textContent = 'Open access';
      reset.addEventListener('click', () => {
        setTier('free');
        location.reload();
      });
      host.appendChild(reset);
    }
  }

  function mountFreeBanner(mode) {
    if (hasTier('pro')) return;
    const main = document.querySelector('.pc-main');
    if (!main) return;
    injectStyles();
    const b = document.createElement('p');
    b.className = 'ww-banner-free';
    b.innerHTML = mode === 'preview_on_free'
      ? 'Lab preview (open). Builder and marketplace install path require a <a href="pricing.html">governed install</a>.'
      : 'Library browse (open). Install actions require a <a href="pricing.html">governed install</a>.';
    main.prepend(b);
  }

  async function loadEntitlements() {
    try {
      const res = await fetch('assets/entitlements.json', { cache: 'no-store' });
      if (res.ok) entitlements = Object.assign({}, DEFAULT_ENTITLEMENTS, await res.json());
    } catch (_) { /* keep defaults */ }
  }

  /** Future: Runtime who/may */
  async function tryRuntimeSession() {
    // Placeholder — when bridge exposes /v1/who with entitlements, merge here.
    // Example: fetch('http://127.0.0.1:8130/v1/who') 
    return null;
  }

  async function gatePage() {
    await loadEntitlements();
    const runtime = await tryRuntimeSession();
    if (runtime && runtime.tier) writeSession(runtime);

    const page = pageName();
    const rule = (entitlements.routes || {})[page];
    if (!rule) {
      applyFeatureLocks();
      return;
    }

    ensureFreeSession();
    const need = rule.min_tier || 'free';

    if (!hasTier(need)) {
      // Hard wall for Pro-only pages
      document.documentElement.style.visibility = 'hidden';
      showPaywall({
        title: 'Governed access required',
        body: `"${page}" is closed until a governed install (or local operator override) says otherwise.`,
        fallback: 'app.html'
      });
      // Keep shell visible under wall
      document.documentElement.style.visibility = 'visible';
      mountTierChip();
      return;
    }

    if (rule.mode === 'preview_on_free' || rule.mode === 'browse_on_free') {
      mountFreeBanner(rule.mode);
    }

    mountTierChip();
    applyFeatureLocks();
  }

  window.WWEntitlements = {
    readSession,
    setTier,
    hasTier,
    canFeature,
    showPaywall,
    ensureFreeSession
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', gatePage);
  } else {
    gatePage();
  }
})();
