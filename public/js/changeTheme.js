let scheme = localStorage.getItem('scheme');

const SCHEMES = {
  dark: () => { document.querySelector('html').setAttribute('scheme-mode', 'dark') },
  light: () => { document.querySelector('html').setAttribute('scheme-mode', 'light') },
}

const psc = window.matchMedia('(prefers-color-scheme: dark)');

if (scheme == null) {
  if (psc.matches) {
    scheme = 'dark'
  } else scheme = 'light';
}

SCHEMES[scheme]();

const togglescheme = document.getElementById('toggle-scheme');

togglescheme.addEventListener('click', () => {
  if (scheme == 'dark') scheme = 'light'
  else scheme = 'dark'

  SCHEMES[scheme]();

  localStorage.setItem('scheme', scheme);
})