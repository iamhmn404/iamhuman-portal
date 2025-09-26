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

  function randomDelay(ch) {
    if (ch === "\n") return 260;             // pause longer at line breaks
    if (/[.,:;)]/.test(ch)) return 80;       // pause slightly on punctuation
    if (/\s/.test(ch)) return 30;            // shorter pause on spaces
    return 18 + Math.random() * 40;          // default randomised delay
  }

  function type() {
    if (i < fullText.length) {
      const ch = fullText.charAt(i);
      cursor.before(document.createTextNode(ch));
      i++;
      setTimeout(type, randomDelay(ch));
    }
  }

  // Respect reduced motion
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    pre.textContent = fullText;
    pre.appendChild(cursor);
  } else {
    type();
  }
});
