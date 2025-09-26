// ===== CONFIG =====
const STATIC_BRIGHTNESS = 0.6; // 0 = black, 1 = pure white
const STATIC_GRAINSIZE   = 3;   // 1 = fine noise, 2–3 = chunkier grains

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
    if (ch === "\n") return 250;
    if (/[.,:;)]/.test(ch)) return 80;
    if (/\s/.test(ch)) return 30;
    return rand(10, 32);
  }

  function type() {
    if (i >= fullText.length) return;

    // detect "404:" → pause
    const slice = fullText.slice(i, i + 4);
    if (slice === "404:") {
      cursor.before(document.createTextNode("404:"));
      i += 4;
      setTimeout(type, 2000); // pause 2s
      return;
    }

    // detect <span ...> markup
    if (fullText.startsWith('<span', i)) {
      const tagEnd = fullText.indexOf('>', i) + 1;
      const closing = '</span>';
      const closeIdx = fullText.indexOf(closing, tagEnd);
      const innerText = fullText.slice(tagEnd, closeIdx);

      // create the span
      const spanEl = document.createElement("span");
      spanEl.setAttribute("class", "purple");
      cursor.before(spanEl);

      // type the innerText into span
      let j = 0;
      function typeSpan() {
        if (j < innerText.length) {
          spanEl.append(innerText.charAt(j));
          j++;
          setTimeout(typeSpan, delay(innerText.charAt(j-1)));
        } else {
          i = closeIdx + closing.length; // skip past </span>
          setTimeout(type, 60);
        }
      }
      typeSpan();
      return;
    }

    // normal characters
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

// ===== TV STATIC (canvas with grain size & brightness) =====
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
    const white = Math.floor(255 * STATIC_BRIGHTNESS);
    const greyHex = (white << 16) | (white << 8) | white;

    const grain = STATIC_GRAINSIZE;

    for (let y = 0; y < h; y += grain) {
      for (let x = 0; x < w; x += grain) {
        const color = (Math.random() < 0.5)
          ? (0xDF000000 | greyHex) // greyish "white"
          : 0xDF000000;            // black

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
  window.addEventListener('resize', resize);

  const reduce = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) {
    const white = Math.floor(255 * STATIC_BRIGHTNESS);
    const greyHex = (white << 16) | (white << 8) | white;
    const grain = STATIC_GRAINSIZE;

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
