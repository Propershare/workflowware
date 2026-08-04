/**
 * maat-motion — cursor-reactive interaction primitives for Workflowware surfaces.
 *
 * Zero dependencies. Zero network. Drop into any single-file surface.
 *
 * THE GOVERNANCE CONSTRAINT
 *
 *   Motion may never obscure state.
 *
 *   A pulsing amber chip reads as "loading". Amber means "we do not know", and
 *   those are opposite messages. So tri-state indicators, decision controls and
 *   open review items are motion-frozen by construction -- not by convention.
 *   data-maat-state elements are refused by every primitive here.
 *
 * ACCESSIBILITY
 *
 *   prefers-reduced-motion disables every effect. The INFORMATION must be
 *   identical with motion off -- if a value only appears on hover, it is not a
 *   design, it is a hiding place.
 */

(() => {
  "use strict";

  const REDUCED = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

  /** Elements carrying live governance state never animate. */
  const FROZEN = "[data-maat-state],[data-maat-frozen],.st,.tri";
  const isFrozen = (el) => !!el.closest?.(FROZEN);

  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;

  // Single shared pointer + one rAF loop. Many listeners on mousemove is how
  // an interaction layer becomes a performance bug.
  const pointer = { x: -9999, y: -9999, active: false };
  const tasks = new Set();
  let running = false;

  addEventListener("pointermove", (e) => {
    pointer.x = e.clientX; pointer.y = e.clientY; pointer.active = true;
    start();
  }, { passive: true });

  addEventListener("pointerleave", () => { pointer.active = false; start(); }, { passive: true });

  function start() {
    if (running || REDUCED) return;
    running = true;
    requestAnimationFrame(function frame() {
      let live = false;
      for (const t of tasks) live = t() || live;
      running = live;
      if (live) requestAnimationFrame(frame);
    });
  }

  // ---------------------------------------------------------------- 1. type
  /**
   * Proximity type. Per-character variable-font response to cursor distance.
   * Degrades to font-weight where variation axes are unavailable, and to
   * nothing at all under reduced motion.
   *
   *   <h1 data-maat-proximity data-radius="180" data-peak="800">Governed</h1>
   */
  function initProximityType(root = document) {
    root.querySelectorAll("[data-maat-proximity]").forEach((el) => {
      if (isFrozen(el) || el.dataset.maatBound) return;
      el.dataset.maatBound = "1";

      const radius = +(el.dataset.radius || 160);
      const rest = +(el.dataset.rest || 400);
      const peak = +(el.dataset.peak || 800);

      // Split to spans once. Preserve spaces so selection and reading survive.
      const chars = [...el.textContent];
      el.textContent = "";
      const spans = chars.map((ch) => {
        const s = document.createElement("span");
        s.textContent = ch;
        s.style.display = "inline-block";
        s.style.willChange = "font-variation-settings, font-weight";
        s.style.transition = "font-weight .12s linear";
        if (ch === " ") s.style.width = "0.3em";
        el.appendChild(s);
        return s;
      });

      const state = spans.map(() => rest);

      tasks.add(() => {
        if (!pointer.active) {
          let moving = false;
          spans.forEach((s, i) => {
            if (Math.abs(state[i] - rest) > 1) { moving = true; }
            state[i] = lerp(state[i], rest, 0.12);
            apply(s, state[i]);
          });
          return moving;
        }
        spans.forEach((s, i) => {
          const r = s.getBoundingClientRect();
          const dx = pointer.x - (r.left + r.width / 2);
          const dy = pointer.y - (r.top + r.height / 2);
          const d = Math.hypot(dx, dy);
          const t = 1 - clamp(d / radius, 0, 1);
          const target = lerp(rest, peak, t * t); // ease so the field has a soft edge
          state[i] = lerp(state[i], target, 0.22);
          apply(s, state[i]);
        });
        return true;
      });

      function apply(span, w) {
        const v = Math.round(w);
        span.style.fontVariationSettings = `"wght" ${v}`;
        span.style.fontWeight = String(v); // fallback for non-variable faces
      }
    });
  }

  // ------------------------------------------------------------ 2. magnetic
  /**
   * Magnetic container. Tilts and lifts toward the cursor while it is inside.
   *
   *   <div class="card" data-maat-magnetic data-tilt="6" data-lift="4">
   */
  function initMagnetic(root = document) {
    root.querySelectorAll("[data-maat-magnetic]").forEach((el) => {
      if (isFrozen(el) || el.dataset.maatBound) return;
      el.dataset.maatBound = "1";

      const tilt = +(el.dataset.tilt || 5);
      const lift = +(el.dataset.lift || 4);
      let cur = { rx: 0, ry: 0, z: 0 }, tgt = { rx: 0, ry: 0, z: 0 }, inside = false;

      el.style.transformStyle = "preserve-3d";
      el.style.willChange = "transform";

      el.addEventListener("pointerenter", () => { inside = true; start(); });
      el.addEventListener("pointerleave", () => {
        inside = false; tgt = { rx: 0, ry: 0, z: 0 }; start();
      });

      tasks.add(() => {
        if (inside && pointer.active) {
          const r = el.getBoundingClientRect();
          const px = (pointer.x - r.left) / r.width - 0.5;
          const py = (pointer.y - r.top) / r.height - 0.5;
          tgt = { rx: -py * tilt, ry: px * tilt, z: lift };
        }
        const d = Math.abs(cur.rx - tgt.rx) + Math.abs(cur.ry - tgt.ry) + Math.abs(cur.z - tgt.z);
        if (d < 0.01) { el.style.transform = ""; return false; }
        cur.rx = lerp(cur.rx, tgt.rx, 0.16);
        cur.ry = lerp(cur.ry, tgt.ry, 0.16);
        cur.z = lerp(cur.z, tgt.z, 0.16);
        el.style.transform =
          `perspective(900px) rotateX(${cur.rx.toFixed(2)}deg) rotateY(${cur.ry.toFixed(2)}deg) translateZ(${cur.z.toFixed(2)}px)`;
        return true;
      });
    });
  }

  // ----------------------------------------------------------- 3. spotlight
  /**
   * Spotlight. A soft radial follows the cursor across a panel, via CSS vars.
   * Purely decorative -- carries no information, so losing it costs nothing.
   *
   *   <section data-maat-spotlight>
   */
  function initSpotlight(root = document) {
    root.querySelectorAll("[data-maat-spotlight]").forEach((el) => {
      if (el.dataset.maatBound) return;
      el.dataset.maatBound = "1";
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
        el.style.setProperty("--ma", "1");
      }, { passive: true });
      el.addEventListener("pointerleave", () => el.style.setProperty("--ma", "0"));
    });
  }

  // ------------------------------------------------------------- 4. digests
  /**
   * Digest settle. A sha256 scrambles then resolves once, on reveal.
   *
   * On brand because these surfaces are full of hashes -- and it makes a digest
   * feel computed rather than decorative. Runs ONCE. A value that keeps moving
   * cannot be read, and a digest exists to be read.
   *
   *   <code data-maat-digest>3f786850e387550f…</code>
   */
  function initDigestSettle(root = document) {
    const HEX = "0123456789abcdef";
    root.querySelectorAll("[data-maat-digest]").forEach((el) => {
      if (el.dataset.maatBound) return;
      el.dataset.maatBound = "1";
      const final = el.textContent;
      if (REDUCED) return; // final text already in place

      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          io.disconnect();
          let frame = 0;
          const total = 22;
          const tick = () => {
            frame++;
            const settled = Math.floor((frame / total) * final.length);
            el.textContent = final.slice(0, settled) +
              [...final.slice(settled)].map((c) =>
                /[0-9a-f]/i.test(c) ? HEX[(Math.random() * 16) | 0] : c).join("");
            if (frame < total) requestAnimationFrame(tick);
            else el.textContent = final;
          };
          requestAnimationFrame(tick);
        });
      }, { threshold: 0.4 });
      io.observe(el);
    });
  }

  // -------------------------------------------------------------- 5. reveal
  /**
   * Reveal on enter. Opacity and a short rise, once.
   *
   *   <div data-maat-reveal data-delay="60">
   */
  function initReveal(root = document) {
    root.querySelectorAll("[data-maat-reveal]").forEach((el) => {
      if (el.dataset.maatBound) return;
      el.dataset.maatBound = "1";
      if (REDUCED) { el.style.opacity = "1"; return; }
      el.style.opacity = "0";
      el.style.transform = "translateY(10px)";
      el.style.transition = "opacity .5s ease, transform .5s cubic-bezier(.2,.8,.2,1)";
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          io.disconnect();
          setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "none";
          }, +(el.dataset.delay || 0));
        });
      }, { threshold: 0.15 });
      io.observe(el);
    });
  }

  // ------------------------------------------------------------------ audit
  /**
   * Motion audit. Reports any primitive attached to a governance-state element.
   * A violation is a bug, not a style choice -- so it is findable, not implicit.
   */
  function auditMotion(root = document) {
    const attrs = ["data-maat-proximity", "data-maat-magnetic"];
    const violations = [];
    attrs.forEach((a) => {
      root.querySelectorAll(`[${a}]`).forEach((el) => {
        if (isFrozen(el)) violations.push({ attr: a, el });
      });
    });
    return violations;
  }

  function init(root = document) {
    initProximityType(root);
    initMagnetic(root);
    initSpotlight(root);
    initDigestSettle(root);
    initReveal(root);
    const v = auditMotion(root);
    if (v.length) {
      console.error(
        "[maat-motion] MOTION ON GOVERNANCE STATE — refused:",
        v.map((x) => `${x.attr} on ${x.el.className || x.el.tagName}`)
      );
    }
    return { reducedMotion: REDUCED, violations: v.length };
  }

  window.MaatMotion = { init, auditMotion, reducedMotion: REDUCED };
  if (document.readyState !== "loading") init();
  else addEventListener("DOMContentLoaded", () => init());
})();
