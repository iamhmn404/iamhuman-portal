// ================== CONFIG ==================
const STATIC_BRIGHTNESS = 0.6; // 0 = black, 1 = bright white
const STATIC_GRAINSIZE  = 3;   // 1 = fine, 2–3 = chunkier snow

// ================= TYPEWRITER =================
document.addEventListener("DOMContentLoaded", () => {
  const pre = document.getElementById("transmission");
  if (!pre) return;

  // Themed content with spans for colour
  const fullText = `
Δ-I AM // HUMAN

TRANSMISSION // <span class="error">UNSTABLE</span>
Portal initializing...

/ NO FACE
/ NO NAME
/ JUST THE WORK

∆ = proof_of_presence
// iamhuman404:<span class="white">not_found</span>

=[+] HUM // NOISE → SIGNAL
Searching static...
Estimated contact: <span class="highlight">March 2026</span>

> <span class="system">lookup</span> // not yet accessible
> <span class="system">awaiting next transmission</span>
  `.trim();

  pre.innerHTML = ""; // start clean

  const cursor = document.createElement("span");
  cursor.className = "typing-cursor";
  cursor.setAttribute("aria-hidden", "true");
  cursor.textContent = " ";
  pre.appendChild(cursor);

  let i = 0;
  const prefersReduced = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function rand(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }

  // ⚡ Faster timings (≈40% quicker)
  function delay(ch) {
    if (ch === "\n") return 180;        // newline pause
    if (/[.,:;)]/.test(ch)) return 50;  // punctuation pause
    if (/\s/.test(ch)) return 20;       // spaces
    return rand(8, 28);                 // baseline speed
  }

  function type() {
    if (i >= fullText.length) return;

    // Pause after "404:"
    const slice = fullText.slice(i, i + 4);
    if (slice === "404:") {
      cursor.before(document.createTextNode("404:"));
      i += 4;
      setTimeout(type, 2000); // 2s pause
      return;
    }

    // Handle <span class="..."> ... </span> typing character-by-character
    if (fullText.startsWith("<span", i)) {
      const tagEnd = fullText.indexOf(">", i) + 1;
      const openTag = fullText.slice(i, tagEnd); // e.g., <span class="error">
      const classMatch = openTag.match(/class="([^"]+)"/);
      const closing = "</span>";
      const closeIdx = fullText.indexOf(closing, tagEnd);
      const innerText = fullText.slice(tagEnd, closeIdx);

      const spanEl = document.createElement("span");
      if (classMatch) spanEl.className = classMatch[1];
      cursor.before(spanEl);

      let j = 0;
      (function typeSpan() {
        if (j < innerText.length) {
          const ch = innerText.charAt(j++);
          spanEl.append(ch);
          setTimeout(typeSpan, delay(ch));
        } else {
          i = closeIdx + closing.length; // move past </span>
          setTimeout(type, 50);
        }
      })();
      return;
    }

    // Normal character
    const ch = fullText.charAt(i++);
    cursor.before(document.createTextNode(ch));
    setTimeout(type, delay(ch));
  }

  if (prefersReduced) {
    pre.innerHTML = fullText;
    pre.appendChild(cursor);
  } else {
    type();
  }
});

// ============== TV STATIC (canvas) ==============
(() => {
  const canvas = document.getElementById("snow");
  if (!canvas) return;

  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  let w, h, imageData, buf;

  function resize() {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
    imageData = ctx.createImageData(w, h);
    buf = new Uint32Array(imageData.data.buffer);
  }

  function drawFrame() {
    const white = Math.floor(255 * STATIC_BRIGHTNESS);
    const greyHex = (white << 16) | (white << 8) | white;
    const grain = Math.max(1, (STATIC_GRAINSIZE | 0));

    for (let y = 0; y < h; y += grain) {
      for (let x = 0; x < w; x += grain) {
        const color = (Math.random() < 0.5)
          ? (0xDF000000 | greyHex) // grey "white" with alpha
          : 0xDF000000;            // black with same alpha

        for (let gy = 0; gy < grain; gy++) {
          for (let gx = 0; gx < grain; gx++) {
            const px = (y + gy) * w + (x + gx);
            if (px < buf.length) buf[px] = color;
          }
        }
      }
    }

    ctx.putImageData(imageData, 0, 0);
    requestAnimationFrame(drawFrame);
  }

  resize();
  window.addEventListener("resize", resize);

  const reduce = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduce) {
    // Render a single frame
    const white = Math.floor(255 * STATIC_BRIGHTNESS);
    const greyHex = (white << 16) | (white << 8) | white;
    const grain = Math.max(1, (STATIC_GRAINSIZE | 0));

    for (let y = 0; y < h; y += grain) {
      for (let x = 0; x < w; x += grain) {
        const color = (Math.random() < 0.5)
          ? (0xDF000000 | greyHex)
          : 0xDF000000;

        for (let gy = 0; gy < grain; gy++) {
          for (let gx = 0; gx < grain; gx++) {
            const px = (y + gy) * w + (x + gx);
            if (px < buf.length) buf[px] = color;
          }
        }
      }
    }
    ctx.putImageData(imageData, 0, 0);
  } else {
    requestAnimationFrame(drawFrame);
  }
})();
