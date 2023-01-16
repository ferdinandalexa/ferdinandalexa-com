let scheme = localStorage.getItem('scheme');

const SCHEMES = {
  dark: () => {
    document.body.classList.add('dark')
    document.body.classList.remove('light')
  },
  light: () => {
    document.body.classList.add('light')
    document.body.classList.remove('dark')
  },
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