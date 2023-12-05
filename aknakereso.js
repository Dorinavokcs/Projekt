document.addEventListener('DOMContentLoaded', () => {
    const gomb = document.getElementById('gomb');
    const body = document.body;
  
    gomb.addEventListener('click', () => {
      body.classList.toggle('sotet');
    });
  })