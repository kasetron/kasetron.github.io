// Photo lightbox: any <a data-lb href="image"> opens over the page, with arrows / keys / swipe.
(function () {
  var links = [].slice.call(document.querySelectorAll('a[data-lb]'));
  if (!links.length) return;

  // One entry per distinct image, in page order (an image shown inline and in the gallery counts once).
  var items = [], index = {};
  links.forEach(function (a) {
    var cap = a.getAttribute('data-caption') || '';
    if (!(a.href in index)) { index[a.href] = items.length; items.push({ src: a.href, cap: cap }); }
    else if (cap && !items[index[a.href]].cap) items[index[a.href]].cap = cap;
  });

  var box, img, cap, count, closeBtn, current = 0, opener = null;

  function build() {
    box = document.createElement('div');
    box.className = 'lb';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', 'Photo viewer');
    box.innerHTML =
      '<button class="lb-btn lb-close" aria-label="Close">&times;</button>' +
      '<button class="lb-btn lb-prev" aria-label="Previous photo">&#8249;</button>' +
      '<button class="lb-btn lb-next" aria-label="Next photo">&#8250;</button>' +
      '<figure class="lb-fig"><img alt=""><figcaption><span class="lb-cap"></span><span class="lb-count"></span></figcaption></figure>';
    document.body.appendChild(box);
    img = box.querySelector('img');
    cap = box.querySelector('.lb-cap');
    count = box.querySelector('.lb-count');
    closeBtn = box.querySelector('.lb-close');
    if (items.length < 2) box.classList.add('single');

    box.addEventListener('click', function (e) {
      if (e.target.closest('.lb-close') || e.target === box || e.target.classList.contains('lb-fig')) close();
      else if (e.target.closest('.lb-prev')) go(-1);
      else if (e.target.closest('.lb-next')) go(1);
    });
    var x0 = null;
    box.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    box.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
    });
  }

  function show(i) {
    current = (i + items.length) % items.length;
    img.src = items[current].src;
    img.alt = items[current].cap;
    cap.textContent = items[current].cap;
    count.textContent = items.length > 1 ? (current + 1) + ' / ' + items.length : '';
    [1, -1].forEach(function (d) { new Image().src = items[(current + d + items.length) % items.length].src; });
  }
  function go(d) { show(current + d); }
  function open(i) {
    if (!box) build();
    opener = document.activeElement;
    show(i);
    box.classList.add('open');
    document.body.classList.add('lb-lock');
    closeBtn.focus();
  }
  function close() {
    box.classList.remove('open');
    document.body.classList.remove('lb-lock');
    img.removeAttribute('src');
    if (opener && opener.focus) opener.focus();
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[data-lb]');
    if (!a || e.ctrlKey || e.metaKey || e.shiftKey || e.button) return; // keep "open in new tab" working
    e.preventDefault();
    open(index[a.href]);
  });
  document.addEventListener('keydown', function (e) {
    if (!box || !box.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') go(-1);
    else if (e.key === 'ArrowRight') go(1);
  });
})();
