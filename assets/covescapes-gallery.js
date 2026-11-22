(() => {
  const previews = Array.from(document.querySelectorAll('[data-cove-edition-preview]'));
  const dialog = document.getElementById('cove-edition-lightbox');
  if (typeof dialog.showModal !== 'function' || !previews.length) return;
  const image = dialog.querySelector('img');
  const caption = dialog.querySelector('figcaption');
  let current = 0;
  let opener;
  function show(index) {
    current = (index + previews.length) % previews.length;
    const link = previews[current];
    image.src = link.href;
    image.alt = link.querySelector('img').alt;
    const label = link.closest('figure').querySelector('figcaption').textContent.trim();
    caption.textContent = (current + 1) + ' / ' + previews.length + ' · ' + label;
  }
  previews.forEach((link, index) => link.addEventListener('click', (event) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    opener = link;
    show(index);
    dialog.showModal();
  }));
  dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
  dialog.querySelector('[data-previous]').addEventListener('click', () => show(current - 1));
  dialog.querySelector('[data-next]').addEventListener('click', () => show(current + 1));
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      show(current + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  });
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => opener?.focus());
})();
