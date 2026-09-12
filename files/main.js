/* ═══════════════════════════════════════════════════════════════════════
   LUNACOF — SCRIPT PRINCIPAL (identique a l'original)
   Charge sur les 5 pages. Chaque bloc est independant : si un element
   n'existe pas sur la page en cours (ex : la carte), le bloc ne fait rien.

   CE QUE FAIT CE FICHIER, DANS L'ORDRE :
     1. lucide.createIcons() .... transforme <i data-lucide="user"> en icone
     2. header "scrolled" ....... ajoute l'ombre du header au defilement
     3. burger .................. ouvre/ferme le menu mobile
     4. reveal .................. fait apparaitre les blocs class="reveal"
     5. compteurs ............... anime les chiffres (data-target)
     6. carte ................... affiche l'infobulle au survol des points
     7. menu actif .............. surligne le lien de la section visible
   ═══════════════════════════════════════════════════════════════════════ */

  // Lucide icons
  if (window.lucide) lucide.createIcons();

  // Sticky header shadow
  const header = document.querySelector('header.site');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, {passive:true}); onScroll();

  // Burger
  const burger = document.getElementById('burger');
  const panel = document.getElementById('mobilePanel');
  burger.addEventListener('click', () => {
    const open = burger.classList.toggle('open');
    panel.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  panel.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    burger.classList.remove('open'); panel.classList.remove('open');
    document.body.style.overflow = '';
  }));

  // Reveal on scroll
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, {threshold:.12, rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Counters
  const fmt = (n) => n.toLocaleString('fr-FR');
  const animate = (el) => {
    const target = +el.dataset.target;
    const dur = 1400; const start = performance.now();
    const tick = (t) => {
      const k = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - k, 3);
      el.textContent = fmt(Math.round(target * eased));
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const cIO = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { animate(e.target); cIO.unobserve(e.target); } });
  }, {threshold:.4});
  document.querySelectorAll('.count').forEach(el => cIO.observe(el));

  // Map tooltips
  const tip = document.getElementById('tooltip');
  const mapWrap = document.querySelector('.map-wrap');
  document.querySelectorAll('.pin').forEach(pin => {
    const show = () => {
      tip.querySelector('b').textContent = pin.dataset.name;
      tip.querySelector('span').textContent = pin.dataset.city;
      tip.querySelector('.tag').textContent = pin.dataset.tag;
      const r = pin.getBoundingClientRect();
      const w = mapWrap.getBoundingClientRect();
      tip.style.left = (r.left - w.left + r.width/2) + 'px';
      tip.style.top  = (r.top  - w.top) + 'px';
      tip.classList.add('show');
    };
    const hide = () => tip.classList.remove('show');
    pin.addEventListener('mouseenter', show);
    pin.addEventListener('mouseleave', hide);
    pin.addEventListener('focus', show);
    pin.addEventListener('blur', hide);
    pin.addEventListener('click', show);
  });

  // pattern style override for hero dots
  const heroPattern = document.querySelector('.archi svg.bg-pattern pattern circle');
  // (kept simple: dots default; lines/grid would require regen — handled via CSS opacity for now)

  // Active nav link on scroll
  const sections = ['#top','#about','#map','#news','#cta','#footer']
    .map(s => document.querySelector(s)).filter(Boolean);
  const links = document.querySelectorAll('nav.menu a');
  const sIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = '#' + e.target.id;
        links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === id));
      }
    });
  }, {rootMargin:'-40% 0px -55% 0px'});
  sections.forEach(s => sIO.observe(s));
