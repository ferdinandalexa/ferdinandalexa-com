const toggleTheme = document.getElementById('toggle-theme');
let darkMode = localStorage.getItem('darkMode');

const psc = window.matchMedia('(prefers-color-scheme: dark)');
if(!darkMode) { darkMode = psc.matches ? 'enabled' : 'disabled' };

if(darkMode === 'enabled') {
  document.body.classList.add('dark');
  toggleTheme.checked = true;
} else toggleTheme.checked = false;


toggleTheme.addEventListener('change', ({target})=>{
  if(target.checked){
    darkMode = 'enabled'
    document.body.classList.toggle('dark')
  }
  else{
    darkMode = 'disabled'
    document.body.classList.remove('dark')
  }
    
  localStorage.setItem('darkMode', darkMode);
})