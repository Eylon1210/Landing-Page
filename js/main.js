const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.primary-nav');
const heroVisualStage = document.querySelector('.hero-visual-stage');

function resizeHeroVisual() {
  if (!heroVisualStage) return;
  const scale = Math.min(heroVisualStage.clientWidth / 624, 1);
  heroVisualStage.style.setProperty('--hero-scale', String(scale));
}

resizeHeroVisual();

if (heroVisualStage && 'ResizeObserver' in window) {
  const heroObserver = new ResizeObserver(resizeHeroVisual);
  heroObserver.observe(heroVisualStage);
} else {
  window.addEventListener('resize', resizeHeroVisual);
}

function closeMenu() {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir men\u00fa');
  navigation.classList.remove('open');
  document.body.classList.remove('menu-open');
}

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Abrir men\u00fa' : 'Cerrar men\u00fa');
    navigation.classList.toggle('open', !isOpen);
    document.body.classList.toggle('menu-open', !isOpen);
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMenu();
  });
}
