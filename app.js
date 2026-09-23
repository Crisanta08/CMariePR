const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const menu = document.querySelector('[data-menu]');

const syncHeader = () => header?.classList.toggle('scrolled', window.scrollY > 24);
syncHeader();
window.addEventListener('scroll', syncHeader, { passive: true });

if (menuToggle && menu) {
  const closeMenu = () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
    document.body.classList.remove('menu-open');
  };

  menuToggle.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(open));
    menu.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
  });

  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  window.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });
}

const strategyContent = {
  launch: {
    title: 'Make the launch worth talking about',
    copy: 'Whether it’s a new brand, collection, product or campaign, we find the story, shape the rollout & introduce it to the people most likely to care.',
    services: ['Brand positioning & launch narrative', 'Editorial media relations', 'Creator, stylist or media outreach'],
    cta: 'Talk through your launch'
  },
  momentum: {
    title: 'Stay in the conversation',
    copy: 'One placement is exciting. Consistent visibility builds recognition. We create a steady rhythm of timely stories that keeps your brand relevant beyond launch day.',
    services: ['Ongoing media relations', 'Editorial calendar & proactive angles', 'Founder, designer & brand storytelling'],
    cta: 'Build your visibility plan'
  },
  seeding: {
    title: 'Get in front of the right people',
    copy: 'The goal isn’t to reach everyone. It’s to reach the editors, creators, stylists, celebrities & tastemakers who can give the brand the right kind of attention.',
    services: ['Audience & relationship strategy', 'Gifting, seeding or paid partnerships', 'Outreach, coordination & follow-through'],
    cta: 'Plan your outreach strategy'
  },
  event: {
    title: 'Make the moment count',
    copy: 'From intimate press previews to full-scale activations, we help create an experience people want to attend, share & keep talking about.',
    services: ['Concept or production partnership', 'Media & influencer guest strategy', 'Event publicity & post-event amplification'],
    cta: 'Talk through your event'
  }
};

const strategyLab = document.querySelector('[data-strategy-lab]');
if (strategyLab) {
  const title = strategyLab.querySelector('[data-result-title]');
  const copy = strategyLab.querySelector('[data-result-copy]');
  const services = strategyLab.querySelector('[data-result-services]');
  const cta = strategyLab.querySelector('.mini-cta');

  strategyLab.querySelectorAll('[data-goal]').forEach(button => {
    button.addEventListener('click', () => {
      const content = strategyContent[button.dataset.goal];
      strategyLab.querySelectorAll('[data-goal]').forEach(tab => tab.setAttribute('aria-selected', String(tab === button)));
      title.textContent = content.title;
      copy.textContent = content.copy;
      services.replaceChildren(...content.services.map(item => {
        const li = document.createElement('li');
        li.textContent = item;
        return li;
      }));
      cta.firstChild.textContent = `${content.cta} `;
      title.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 300, easing: 'ease-out' });
    });
  });
}

const workFilter = document.querySelector('[data-work-filter]');
if (workFilter) {
  const cards = [...workFilter.querySelectorAll('[data-category]')];
  workFilter.querySelectorAll('[data-filter]').forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      workFilter.querySelectorAll('[data-filter]').forEach(tab => tab.classList.toggle('active', tab === button));
      cards.forEach(card => {
        const show = filter === 'all' || card.dataset.category.split(' ').includes(filter);
        card.classList.toggle('hidden', !show);
      });
    });
  });
}

const coverageTrack = document.querySelector('[data-coverage-track]');
document.querySelector('[data-coverage-prev]')?.addEventListener('click', () => coverageTrack?.scrollBy({ left: -340, behavior: 'smooth' }));
document.querySelector('[data-coverage-next]')?.addEventListener('click', () => coverageTrack?.scrollBy({ left: 340, behavior: 'smooth' }));

const revealObserver = 'IntersectionObserver' in window
  ? new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: .12 })
  : null;

document.querySelectorAll('.reveal').forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 4, 2) * 70}ms`;
  if (revealObserver) revealObserver.observe(element);
  else element.classList.add('in-view');
});

const tilt = document.querySelector('[data-tilt]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (tilt && !reduceMotion && window.matchMedia('(pointer: fine)').matches) {
  tilt.addEventListener('pointermove', event => {
    const rect = tilt.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = (event.clientY - rect.top) / rect.height - .5;
    tilt.style.transform = `perspective(900px) rotateY(${x * 4}deg) rotateX(${y * -4}deg)`;
  });
  tilt.addEventListener('pointerleave', () => { tilt.style.transform = ''; });
}

document.querySelector('[data-year]').textContent = new Date().getFullYear();
