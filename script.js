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
  let w, h, imageData, buf;

  function resize() {
    // CSS size (visual)
    const cssW = window.innerWidth;
    const cssH = window.innerHeight;
    canvas.style.width  = cssW + "px";
    canvas.style.height = cssH + "px";

    // Device pixels for crispness
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    canvas.width  = Math.floor(cssW * dpr);
    canvas.height = Math.floor(cssH * dpr);

    // Reset transform so 1 canvas unit = 1 CSS pixel
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    w = cssW; h = cssH;
    imageData = ctx.createImageData(w, h);
    buf = new Uint32Array(imageData.data.buffer);
  }

  function drawFrame() {
    const len = buf.length;
    for (let i = 0; i < len; i++) {
      // random pixel: white-ish or black-ish with alpha ~225 (DF)
      buf[i] = (Math.random() < 0.5) ? 0xDFFFFFFF : 0xDF000000;
    }
    ctx.putImageData(imageData, 0, 0);
    requestAnimationFrame(drawFrame);
  }

  resize();
  window.addEventListener('resize', resize);

  const reduce = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) {
    for (let i = 0; i < buf.length; i++) {
      buf[i] = (Math.random() < 0.5) ? 0xDFFFFFFF : 0xDF000000;
    }
    ctx.putImageData(imageData, 0, 0);
  } else {
    requestAnimationFrame(drawFrame);
  }
})();
