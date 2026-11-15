const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
const mobile = window.matchMedia('(max-width: 850px)');
function closeMenu() {
  toggle.setAttribute('aria-expanded', 'false');
  navigation.classList.toggle('mobile-collapsed', mobile.matches);
}
toggle.hidden = false;
closeMenu();
toggle.addEventListener('click', () => {
  const expanded = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!expanded));
  navigation.classList.toggle('mobile-collapsed', expanded);
});
mobile.addEventListener('change', closeMenu);
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    toggle.focus();
  }
});
const links = [...navigation.querySelectorAll('a')];
const sections = [...document.querySelectorAll('main > section')];
function updateNavigation() {
  let current = sections[0].id;
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= 150) current = section.id;
  }
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 3) current = sections.at(-1).id;
  for (const link of links) {
    if (link.hash === `#${current}`) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
}
let scheduled = false;
window.addEventListener('scroll', () => {
  if (!scheduled) {
    scheduled = true;
    requestAnimationFrame(() => { updateNavigation(); scheduled = false; });
  }
}, { passive: true });
updateNavigation();
document.querySelector('#year').textContent = new Date().getFullYear();
