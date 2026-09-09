/* Edita la fecha aquí. -06:00 corresponde a la hora de San Miguel de Allende. */
(function () {
  'use strict';
  const eventDate = new Date('2027-10-17T16:00:00-06:00').getTime();
  const entry = document.getElementById('entrance');
  const envelope = document.getElementById('open-envelope');
  const invitation = document.getElementById('invitation');
  const audio = document.getElementById('background-music');
  const musicButton = document.getElementById('music-toggle');
  const musicLabel = document.getElementById('music-label');
  const audioError = document.getElementById('audio-error');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let fadeTimer;
  let opening = false;
  let musicRequest = 0;

  // Un mismo desplazamiento pausado para todos los enlaces a secciones.
  let scrollFrame = 0;
  function cancelScroll() {
    window.cancelAnimationFrame(scrollFrame);
    scrollFrame = 0;
  }
  window.addEventListener('wheel', cancelScroll, { passive: true });
  window.addEventListener('touchstart', cancelScroll, { passive: true });
  window.addEventListener('keydown', function (event) {
    if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', 'Escape', ' '].includes(event.key)) cancelScroll();
  });
  document.addEventListener('click', function (event) {
    const link = event.target.closest('a[href^="#"]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const hash = link.getAttribute('href');
    if (hash.length < 2) return;
    let target;
    try { target = document.getElementById(decodeURIComponent(hash.slice(1))); } catch (error) { return; }
    if (!target) return;
    event.preventDefault();
    cancelScroll();
    const start = window.scrollY;
    const destination = Math.max(0, Math.min(
      start + target.getBoundingClientRect().top - 24,
      document.documentElement.scrollHeight - window.innerHeight
    ));
    const distance = destination - start;
    const duration = Math.min(2200, 1200 + Math.abs(distance) * 0.14);
    let started;
    function finish() {
      scrollFrame = 0;
      if (!target.hasAttribute('tabindex')) {
        target.setAttribute('tabindex', '-1');
        target.addEventListener('blur', function () { target.removeAttribute('tabindex'); }, { once: true });
      }
      target.focus({ preventScroll: true });
      // pushState también evita que el navegador dé un salto al cambiar el hash.
      try { if (window.location.hash !== hash) window.history.pushState(null, '', hash); } catch (error) { /* Archivos locales con historial restringido. */ }
    }
    function step(time) {
      if (started === undefined) started = time;
      const progress = Math.min(1, (time - started) / duration);
      const eased = progress * progress * progress * (progress * (progress * 6 - 15) + 10);
      window.scrollTo({ top: start + distance * eased, behavior: 'instant' });
      if (progress < 1) scrollFrame = window.requestAnimationFrame(step);
      else finish();
    }
    if (reducedMotion.matches || Math.abs(distance) < 2) {
      window.scrollTo({ top: destination, behavior: 'instant' });
      finish();
    } else scrollFrame = window.requestAnimationFrame(step);
  });

  function updateCountdown() {
    const seconds = Math.max(0, Math.floor((eventDate - Date.now()) / 1000));
    const values = [Math.floor(seconds / 86400), Math.floor(seconds / 3600) % 24, Math.floor(seconds / 60) % 60, seconds % 60];
    document.querySelectorAll('[data-countdown]').forEach(function (element, index) {
      element.textContent = String(values[index]).padStart(2, '0');
    });
    if (seconds === 0) document.getElementById('countdown-title').textContent = 'Llegó nuestro día';
    return seconds;
  }
  updateCountdown();
  const countdownTimer = window.setInterval(function () {
    if (updateCountdown() === 0) window.clearInterval(countdownTimer);
  }, 1000);

  function setMusicState(playing) {
    musicButton.classList.toggle('is-playing', playing);
    musicButton.setAttribute('aria-pressed', String(playing));
    musicButton.setAttribute('aria-label', playing ? 'Pausar música de fondo' : 'Reproducir música de fondo');
    musicLabel.textContent = playing ? 'PAUSAR' : 'MÚSICA';
  }
  async function startMusic() {
    const request = ++musicRequest;
    window.clearInterval(fadeTimer);
    try {
      audio.volume = 0;
      await audio.play();
      if (request !== musicRequest) return;
      setMusicState(true);
      audioError.hidden = true;
      fadeTimer = window.setInterval(function () {
        audio.volume = Math.min(0.45, audio.volume + 0.015);
        if (audio.volume >= 0.45) window.clearInterval(fadeTimer);
      }, 100);
    } catch (error) {
      if (request !== musicRequest) return;
      setMusicState(false);
      audioError.hidden = false;
    }
  }
  musicButton.addEventListener('click', function () {
    if (!audio.paused) {
      ++musicRequest;
      window.clearInterval(fadeTimer);
      audio.pause();
      setMusicState(false);
    } else startMusic();
  });
  audio.addEventListener('error', function () {
    window.clearInterval(fadeTimer);
    setMusicState(false);
    audioError.hidden = false;
  });
  function revealSections() {
    if (!('IntersectionObserver' in window) || reducedMotion.matches) return;
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (item) {
        if (item.isIntersecting) {
          item.target.classList.add('visible');
          observer.unobserve(item.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(function (element) {
      element.classList.add('will-reveal');
      observer.observe(element);
    });
  }
  invitation.inert = true;
  envelope.addEventListener('click', function () {
    if (opening) return;
    opening = true;
    envelope.disabled = true;
    entry.classList.add('is-opening');
    startMusic();
    window.setTimeout(function () {
      invitation.inert = false;
      document.body.classList.remove('envelope-pending');
      document.body.classList.add('invitation-open');
      entry.hidden = true;
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.getElementById('inicio').focus({ preventScroll: true });
      revealSections();
    }, reducedMotion.matches ? 0 : 4500);
  });
})();
