// ===== TYPEWRITER =====
document.addEventListener("DOMContentLoaded", () => {
  const pre = document.getElementById("transmission");
  if (!pre) return;

  const fullText = pre.textContent;
  pre.textContent = "";

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
  function type(){
    if (i >= fullText.length) return;
    const ch = fullText.charAt(i++);
    cursor.before(document.createTextNode(ch));
    setTimeout(type, delay(ch));
  }
  if (reduce){ pre.textContent = fullText; pre.appendChild(cursor); }
  else { type(); }
});

// ===== TRUE TV STATIC (canvas) =====
(() => {
  const canvas = document.getElementById('snow');
  if (!canvas) return;

  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  let cssW, cssH, pxW, pxH, imageData, buf;

  function resize() {
    // CSS size (visual)
    cssW = window.innerWidth;
    cssH = window.innerHeight;

    // Device pixel ratio for crispness
    const dpr = Math.max(1, window.devicePixelRatio || 1);

    // Set CSS size (what you see)
    canvas.style.width  = cssW + 'px';
    canvas.style.height = cssH + 'px';

    // Set internal pixel buffer size (what we draw into)
    pxW = Math.floor(cssW * dpr);
    pxH = Math.floor(cssH * dpr);
    canvas.width  = pxW;
    canvas.height = pxH;

    // IMPORTANT: putImageData ignores transforms, so keep identity.
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    imageData = ctx.createImageData(pxW, pxH);
    buf = new Uint32Array(imageData.data.buffer);
  }

  function drawFrame() {
    // Random black/white pixels with alpha ~223 (0xDF)
    const len = buf.length;
    for (let i = 0; i < len; i++) {
      buf[i] = (Math.random() < 0.5) ? 0xDFFFFFFF : 0xDF000000; // 0xAARRGGBB
    }
    ctx.putImageData(imageData, 0, 0);
    requestAnimationFrame(drawFrame);
  }

  resize();
  window.addEventListener('resize', resize);

  const reduce = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) {
    // One static frame
    const len = buf.length;
    for (let i = 0; i < len; i++) {
      buf[i] = (Math.random() < 0.5) ? 0xDFFFFFFF : 0xDF000000;
    }
    ctx.putImageData(imageData, 0, 0);
  } else {
    requestAnimationFrame(drawFrame);
  }
})();
