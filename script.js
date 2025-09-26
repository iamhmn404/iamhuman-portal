// ===== CONFIG =====
const STATIC_BRIGHTNESS = 0.5; // 0 = black, 1 = pure white (try 0.5–0.7)

// ===== TYPEWRITER =====
document.addEventListener("DOMContentLoaded", () => {
  const pre = document.getElementById("transmission");
  if (!pre) return;

  // Markup with span for purple "not_found"
  const fullText = `
Δ-I AM // HUMAN

TRANSMISSION // UNSTABLE
Portal initializing...

/ NO FACE
/ NO NAME
/ JUST THE WORK

∆ = proof_of_presence
// iamhuman404:<span class="purple">not_found</span>

=[+] HUM // NOISE → SIGNAL
Searching static...
Estimated contact: March 2026

> lookup // not yet accessible
> awaiting next transmission
  `.trim();

  pre.innerHTML = ""; // start blank

  const cursor = document.createElement("span");
  cursor.className = "typing-cursor";
  cursor.setAttribute("aria-hidden", "true");
  cursor.textContent = " ";
  pre.appendChild(cursor);

  let i = 0;
  const reduce = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function rand(a,b){ return Math.floor(Math.random()*(b-a+1))+a; }
  function delay(ch){
    if (ch === "\n") return 260;
    if (/[.,:;)]/.test(ch)) return 80;
    if (/\s/.test(ch)) return 30;
    return rand(18, 58);
  }

  function type() {
    if (i >= fullText.length) return;

    // detect the sequence "404:" and pause
    const slice = fullText.slice(i, i + 4);
    if (slice === "404:") {
      cursor.before(document.createTextNode("404:"));
      i += 4;
      setTimeout(type, 2000); // pause 2s
      return;
    }

    // handle span markup for "not_found"
    if (fullText.startsWith('<span', i)) {
      const end = fullText.indexOf('</span>', i) + 7;
      const spanHTML = fullText.slice(i, end);
      cursor.insertAdjacentHTML("beforebegin", spanHTML);
      i = end;
      setTimeout(type, 60);
      return;
    }

    const ch = fullText.charAt(i++);
    cursor.before(document.createTextNode(ch));
    setTimeout(type, delay(ch));
  }

  if (reduce) {
    pre.innerHTML = fullText;
    pre.appendChild(cursor);
  } else {
    type();
  }
});

// ===== TV STATIC (canvas) =====
(() => {
  const canvas = document.getElementById('snow');
  if (!canvas) return;

  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  let w, h, imageData, buf;

  function resize() {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width  = w;
    canvas.height = h;
    imageData = ctx.createImageData(w, h);
    buf = new Uint32Array(imageData.data.buffer);
  }

  function drawFrame() {
    const len = buf.length;
    const white = Math.floor(255 * STATIC_BRIGHTNESS); // scaled brightness
    const greyHex = (white << 16) | (white << 8) | white; // #RRGGBB

    for (let i = 0; i < len; i++) {
      buf[i] = (Math.random() < 0.5)
        ? (0xDF000000 | greyHex) // greyish "white"
        : 0xDF000000;            // black
    }
    ctx.putImageData(imageData, 0, 0);
    requestAnimationFrame(drawFrame);
  }

  resize();
  window.addEventListener('resize', resize);

  const reduce = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    const white = Math.floor(255 * STATIC_BRIGHTNESS);
    const greyHex = (white << 16) | (white << 8) | white;
    for (let i = 0; i < buf.length; i++) {
      buf[i] = (Math.random() < 0.5)
        ? (0xDF000000 | greyHex)
        : 0xDF000000;
    }
    ctx.putImageData(imageData, 0, 0);
  } else {
    requestAnimationFrame(drawFrame);
  }
})();
