document.querySelector('.menu-toggle')?.addEventListener('click', () => {
  document.querySelector('.main-nav').classList.toggle('open');
});

function initR1OpacitySlider() {
  const r1OpacitySlider = document.getElementById('r1-opacity');
  const r1 = document.querySelector('.show-icon-r1');
  const r1OpacityValue = document.getElementById('r1-opacity-value');

  if (r1OpacitySlider && r1) {
    r1OpacitySlider.addEventListener('input', () => {
      r1.style.opacity = r1OpacitySlider.value;
      if (r1OpacityValue) {
        r1OpacityValue.textContent = parseFloat(r1OpacitySlider.value).toFixed(2);
      }
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initR1OpacitySlider);
} else {
  initR1OpacitySlider();
}

const gallery = document.getElementById('gallery');

if (gallery) {
  const items = Array.from(gallery.querySelectorAll('.portfolio-item'));
  const images = items.map(item => item.querySelector('img').src);

  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxCount = document.getElementById('lightbox-count');
  let currentIndex = 0;

  function showImage(index) {
    currentIndex = (index + images.length) % images.length;
    lightboxImage.src = images[currentIndex];
    lightboxCount.textContent = `${currentIndex + 1} / ${images.length}`;
  }

  function openLightbox(index) {
    showImage(index);
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = '';
  }

  items.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });

  document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
  document.getElementById('lightbox-prev').addEventListener('click', () => showImage(currentIndex - 1));
  document.getElementById('lightbox-next').addEventListener('click', () => showImage(currentIndex + 1));

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (event) => {
    if (lightbox.hidden) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') showImage(currentIndex - 1);
    if (event.key === 'ArrowRight') showImage(currentIndex + 1);
  });
}
