// ==== TYPEWRITER (no flicker) ====
document.addEventListener("DOMContentLoaded", () => {
  const pre = document.getElementById("transmission");
  if (!pre) return;

  const fullText = pre.textContent;
  pre.textContent = "";

  // Cursor element
  const cursor = document.createElement("span");
  cursor.className = "typing-cursor";
  cursor.setAttribute("aria-hidden", "true");
  cursor.textContent = " ";
  pre.appendChild(cursor);

  let i = 0;
  const prefersReduced = window.matchMedia &&
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
  if (prefersReduced){ pre.textContent = fullText; pre.appendChild(cursor); }
  else { type(); }
});

// ==== TRUE TV STATIC (canvas) ====
(() => {
  const canvas = document.getElementById('snow');
  if (!canvas) return;

  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  let w, h, imageData, buf, data;

  function resize(){
    // Handle HiDPI
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    w = canvas.clientWidth = window.innerWidth;
    h = canvas.clientHeight = window.innerHeight;
    canvas.width  = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    imageData = ctx.createImageData(w, h);
    buf = new Uint32Array(imageData.data.buffer);
    data = imageData.data;
  }

  function frame(){
    // Fill with random black/white pixels (TV snow)
    const len = buf.length;
    for (let i = 0; i < len; i++){
      // 0xAARRGGBB — choose white or black-ish with alpha ~220
      buf[i] = (Math.random() < 0.5) ? 0xDFFFFFFF : 0xDF000000;
    }
    ctx.putImageData(imageData, 0, 0);
    requestAnimationFrame(frame);
  }

  resize();
  window.addEventListener('resize', resize);
  // Respect reduced motion: render one frame only
  const reduce = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce){
    // one static frame
    for (let i = 0; i < buf.length; i++){
      buf[i] = (Math.random() < 0.5) ? 0xDFFFFFFF : 0xDF000000;
    }
    ctx.putImageData(imageData, 0, 0);
  } else {
    requestAnimationFrame(frame);
  }
})();
