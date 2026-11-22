const imageDialog = document.querySelector('.gator-image-dialog');
const enlargedImage = imageDialog.querySelector('img');

for (const link of document.querySelectorAll('[data-enlarge]')) {
  link.addEventListener('click', (event) => {
    if (typeof imageDialog.showModal !== 'function' || event.ctrlKey ||
        event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    enlargedImage.src = link.href;
    enlargedImage.alt = link.querySelector('img').alt;
    imageDialog.showModal();
    imageDialog.scrollTop = 0;
  });
}

imageDialog.addEventListener('click', (event) => {
  if (event.target !== imageDialog) return;
  const bounds = imageDialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom) imageDialog.close();
});
