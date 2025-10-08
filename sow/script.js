// ==== MENÚ RESPONSIVE ====
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

if (burger && nav) {
  burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
  });

  // Cerrar menú al hacer click en un enlace (móvil)
  nav.addEventListener('click', (e) => {
    if (e.target.matches('a')) {
      nav.classList.remove('nav-active');
      burger.classList.remove('toggle');
    }
  });
}

// ==== CARRUSEL SUPERIOR ====
(function setupMarquee() {
  const track = document.getElementById('carousel-track');
  if (!track) return;

  // Evitar duplicar varias veces
  if (track.dataset.cloned === '1') return;

  // Duplicar contenido dentro del mismo track
  const content = track.innerHTML;
  track.innerHTML = content + content;
  track.dataset.cloned = '1';

  // Accesibilidad
  track.setAttribute('aria-hidden', 'true');

  // Pausar animación al hover
  const viewport = track.parentElement;
  const setState = (state) => { track.style.animationPlayState = state; };
  viewport.addEventListener('mouseenter', () => setState('paused'));
  viewport.addEventListener('mouseleave', () => setState('running'));
})();

// ==== TYPING SECUENCIAL (página de conclusiones) ====
(function typingSequential(){
  const items = Array.from(document.querySelectorAll('[data-typing]'))
    .sort((a,b)=> Number(a.dataset.typing) - Number(b.dataset.typing));
  if (!items.length) return;

  const prep = (el) => {
    const len = [...el.textContent.trim()].length;
    const dur = Math.max(0.9, len * 0.055); // ~55ms por carácter
    el.style.setProperty('--chars', `${len}ch`);
    el.style.setProperty('--dur', `${dur}s`);
  };

  items.forEach(prep);

  const run = (i=0) => {
    if (i >= items.length) return;
    const el = items[i];

    el.classList.remove('typing-run');
    // Reiniciar animación
    void el.offsetWidth;
    el.classList.add('typing-run');

    const onEnd = () => {
      el.removeEventListener('animationend', onEnd);
      run(i+1);
    };
    el.addEventListener('animationend', onEnd);
  };

  run(0);
})();