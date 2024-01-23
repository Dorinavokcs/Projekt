 const gomb = document.getElementsByClassName("gomb")
 for (let i = 0; i < gomb.length; i++) {
   gomb[i].addEventListener("click", hattervaltozas);
 }

function hattervaltozas() {
  const body = document.body;
  const szin = body.style.backgroundColor;
  const main = document.querySelector(".maincontainer");
  if (szin != 'grey') {
    body.style.backgroundColor = 'grey';
    main.style.backgroundColor = `rgba(${251},${120},${120},${.9})`;
  } else {
    body.style.backgroundColor = '';
  }
}
function hideText() {
  var textElement = document.getElementById('animation');
  textElement.style.opacity = 0;
}
