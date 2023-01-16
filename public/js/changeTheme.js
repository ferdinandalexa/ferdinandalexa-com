let scheme = localStorage.getItem('scheme');
const togglescheme = document.getElementById('toggle-scheme');


function setSchemeMode(mode) {
  document.querySelector('html').setAttribute('scheme-mode', mode)
}

const SCHEMES = {
  dark: () => { setSchemeMode('dark') },
  light: () => { setSchemeMode('light') },
}

const psc = window.matchMedia('(prefers-color-scheme: dark)');

if (scheme == null) {
  if (psc.matches) {
    scheme = 'dark'
  } else scheme = 'light';
}

SCHEMES[scheme]();

togglescheme.addEventListener('click', () => {
  if (scheme == 'dark') scheme = 'light'
  else scheme = 'dark'

  SCHEMES[scheme]();

  localStorage.setItem('scheme', scheme);
})