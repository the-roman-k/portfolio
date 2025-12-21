// Hero RK word flip (Figma: section-hero-rk)
(() => {
  const el = document.querySelector("[data-hero-rk-flip]");
  if (!el) return;

  const raw = el.getAttribute("data-words") || "";
  const words = raw
    .split("|")
    .map((w) => w.trim())
    .filter(Boolean);

  if (words.length === 0) return;

  let idx = Math.max(0, words.indexOf(el.textContent.trim()));

  const prefersReducedMotion =
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

  const FLIP_OUT = "heroRkFlipOut";
  const FLIP_IN = "heroRkFlipIn";

  function setWord(nextWord) {
    // Preserve layout width by keeping non-breaking spaces where needed
    el.textContent = nextWord;
  }

  function flipTo(nextWord) {
    // Reset any prior state
    el.classList.remove("is-entering", "is-leaving");

    // Flip out
    el.classList.add("is-leaving");
    const onOut = (e) => {
      if (e.animationName !== FLIP_OUT) return;
      el.removeEventListener("animationend", onOut);

      setWord(nextWord);

      // Flip in
      el.classList.remove("is-leaving");
      el.classList.add("is-entering");

      const onIn = (e2) => {
        if (e2.animationName !== FLIP_IN) return;
        el.removeEventListener("animationend", onIn);
        el.classList.remove("is-entering");
      };
      el.addEventListener("animationend", onIn);
    };
    el.addEventListener("animationend", onOut);
  }

  // Initialize to first word if current word not in list
  if (words.indexOf(el.textContent.trim()) === -1) {
    setWord(words[0]);
    idx = 0;
  }

  window.setInterval(() => {
    idx = (idx + 1) % words.length;
    const nextWord = words[idx];

    if (prefersReducedMotion) {
      setWord(nextWord);
      return;
    }

    flipTo(nextWord);
  }, 3000);
})();


