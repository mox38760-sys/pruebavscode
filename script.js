const projects = {
  lodge: {
    title: "Refugio Rio Frio",
    kicker: "Proyecto MOX",
    mainImage: "./proyectos/001/principal.png",
    mainCaption: "Imagen principal del proyecto Refugio Rio Frio.",
    renderImage: "./proyectos/001/potencial.png",
    renderTitle: "Potencial de vivienda campestre",
    renderCopy:
      "El lote puede transformarse en una residencia campestre de alto valor para familia, retiro o segunda vivienda.",
    conceptImage: "./proyectos/001/desarrollo.png",
    conceptCaption: "Infografia de concepto de desarrollo para Refugio Rio Frio.",
    description:
      "Una vivienda contemporanea integrada al paisaje andino de Tabio, con arquitectura horizontal, ventanales, terrazas panoramicas, cubierta verde parcial y materiales naturales.",
    facts: [
      ["Ubicacion", "Rio Frio, Tabio, Cundinamarca"],
      ["Tipo de oportunidad", "Vivienda campestre"],
      ["Uso sugerido", "Residencia campestre de alto valor"],
      ["Estado actual", "Lote disponible para desarrollo"],
      ["Area del lote", "10.000 m2 (1 hectarea)"],
      ["Area construible", "220 m2 a 280 m2"],
      ["Valor del lote", "$185.000.000 COP"],
      ["Inversion estimada", "$625.000.000 COP"],
      ["Ingresos potenciales", "$950.000.000 a $1.150.000.000 COP"],
      ["Mercado objetivo", "Profesionales de Bogota, familias, teletrabajadores"],
      ["Fortalezas", "Clima frio, cercania a Bogota, paisaje rural, valorizacion"],
      ["Validaciones", "Agua, norma, topografia, suelos y electricidad"],
      ["Diferencial MOX", "Privacidad, visuales, confort climatico y relacion interior-exterior"],
    ],
    whatsapp:
      "https://wa.me/573219931029?text=Hola%20MOX%2C%20quiero%20reservar%20o%20conocer%20mas%20sobre%20Refugio%20Rio%20Frio.",
  },
};

window.addEventListener("keydown", (event) => {
  const isTyping = ["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName);
  if (isTyping) return;

  const slides = [...document.querySelectorAll(".project-slide")];
  const currentIndex = slides.findIndex((slide) => {
    const rect = slide.getBoundingClientRect();
    return rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.45;
  });

  if (event.key === "ArrowDown" && currentIndex < slides.length - 1) {
    slides[currentIndex + 1].scrollIntoView({ behavior: "smooth" });
  }

  if (event.key === "ArrowUp" && currentIndex > 0) {
    slides[currentIndex - 1].scrollIntoView({ behavior: "smooth" });
  }
});

// IntersectionObserver para transición de fundido entre imágenes
(function () {
  const imgs = document.querySelectorAll('.image-stage img');
  if (!imgs || !imgs.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        } else {
          entry.target.classList.remove('in-view');
        }
      });
    },
    { root: null, rootMargin: '0px', threshold: 0.45 }
  );

  imgs.forEach((img) => observer.observe(img));
})();

// Hero background video: loop only the first 13 seconds
(function () {
  const video = document.getElementById('hero-video');
  const MAX_SECONDS = 13;
  if (!video) return;

  // Debug: log events to console
  console.log('[hero-debug]', 'video element found');

  // Ensure muted to allow autoplay on most browsers
  video.muted = true;

  // When metadata loaded, clamp start if needed
  video.addEventListener('loadedmetadata', () => {
    if (video.duration && video.duration > MAX_SECONDS) {
      video.currentTime = 0;
    }
    // try to play (some browsers require user gesture unless muted)
    video.play().catch(() => {});
    console.log('[hero-debug]', 'loadedmetadata — duration: ' + (video.duration || 'unknown'));
  });
  video.addEventListener('loadeddata', () => console.log('[hero-debug]', 'loadeddata — ready to play'));
  video.addEventListener('playing', () => console.log('[hero-debug]', 'playing'));
  video.addEventListener('error', (e) => console.log('[hero-debug]', 'video error: ' + (video.error && video.error.code ? video.error.code : 'unknown')));
  video.addEventListener('stalled', () => console.log('[hero-debug]', 'stalled'));
  video.addEventListener('emptied', () => console.log('[hero-debug]', 'emptied'));

  // Play only the first MAX_SECONDS seconds once, then show the final frame
  let endedByLimit = false;
  video.addEventListener('timeupdate', () => {
    if (endedByLimit) return;
    if (video.currentTime >= MAX_SECONDS) {
      endedByLimit = true;
      // snap to the limit to avoid tiny overshoots
      video.currentTime = Math.min(MAX_SECONDS, video.duration || MAX_SECONDS);

      // Attempt to capture the current frame to a canvas and replace the video with an img
      try {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth || video.clientWidth || 1280;
        canvas.height = video.videoHeight || video.clientHeight || 720;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const data = canvas.toDataURL('image/jpeg', 0.9);

        const img = document.createElement('img');
        img.src = data;
        img.alt = 'Hero final frame';
        img.className = 'hero-video-poster';

        // Hide the video and insert the poster image in the same container
        video.style.display = 'none';
        if (video.parentNode) video.parentNode.insertBefore(img, video.nextSibling);
      } catch (e) {
        // If capture fails (cross-origin or other), just pause the video
        video.pause();
      }
    }
  });

  // Pause video when page hidden to save resources
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) video.pause(); else video.play().catch(() => {});
  });
})();
