const gallery = document.querySelector('.gator-gallery');
const enlarge = gallery.querySelector('[data-enlarge]');
const preview = enlarge.querySelector('img');
const thumbnails = gallery.querySelectorAll('.gallery-thumbs button');
const dialog = gallery.querySelector('dialog');
const fullImage = dialog.querySelector('img');

for (const thumbnail of thumbnails) {
  thumbnail.addEventListener('click', () => {
    const { src, alt, width, height } = thumbnail.dataset;
    preview.src = src;
    preview.alt = alt;
    preview.width = Number(width);
    preview.height = Number(height);
    preview.toggleAttribute('data-portrait', preview.height > preview.width);
    enlarge.href = src;
    enlarge.setAttribute('aria-label', 'Open larger image: ' + alt);
    gallery.querySelector('[aria-pressed="true"]').setAttribute('aria-pressed', 'false');
    thumbnail.setAttribute('aria-pressed', 'true');
    enlarge.scrollIntoView({ block: 'nearest' });
  });
}

enlarge.addEventListener('click', (event) => {
  if (typeof dialog.showModal !== 'function' || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  fullImage.src = enlarge.href;
  fullImage.alt = preview.alt;
  dialog.showModal();
  dialog.scrollTop = 0;
});

dialog.addEventListener('click', (event) => {
  if (event.target === dialog) {
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  }
});
