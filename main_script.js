<<<<<<< HEAD
function hattervaltozas(){
    const body = document.body;
    const szin = body.style.backgroundColor;
=======
>>>>>>> 64127b142322accc79de9bd07d1ce89c7743a88e

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