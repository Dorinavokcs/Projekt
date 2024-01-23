 const gomb = document.getElementsByClassName("gomb")
 for (let i = 0; i < gomb.length; i++) {
   gomb[i].addEventListener("click", hattervaltozas);
 }

function hattervaltozas() {
  const body = document.body;
  const szin = body.style.backgroundColor;
  const main = document.querySelector(".maincontainer");
  if (szin != 'rgb(${219},${211},${96})') {
    body.style.backgroundColor = `rgb(${219},${211},${96})`;
    main.style.backgroundColor = `rgb(${86},${20},${176})`;
  } else {
    body.style.backgroundColor = '';
  }
}
function hideText() {
  let textElement = document.getElementById('animation');
  textElement.style.opacity = 0;
}