// Touch screens have no hover: the card crossing the middle of the screen gets the hover look (.is-active).
(function () {
  if (!window.matchMedia || !matchMedia('(hover: none)').matches || !('IntersectionObserver' in window)) return;
  var cards = document.querySelectorAll('.card');
  if (!cards.length) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { e.target.classList.toggle('is-active', e.isIntersecting); });
  }, { rootMargin: '-48% 0px -48% 0px', threshold: 0 }); // a thin band at the vertical centre
  cards.forEach(function (c) { io.observe(c); });
})();
