document.querySelectorAll('.product-gallery').forEach((gallery) => {
  const main = gallery.querySelector('.gallery-main img');
  const thumbnails = [...gallery.querySelectorAll('.gallery-thumbs button')];
  thumbnails.forEach((button) => {
    button.addEventListener('click', () => {
      const image = button.querySelector('img');
      main.src = image.src;
      main.alt = image.alt.replace(/ thumbnail$/i, '');
      thumbnails.forEach((thumbnail) => {
        thumbnail.setAttribute('aria-pressed', String(thumbnail === button));
      });
    });
  });
});
