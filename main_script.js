const header = document.querySelector(".header");

const gomb =document.getElementById("");
let isSotet = false;
const sotet =(event) =>{
    event.target.classList.toggle("sotet")
}

gomb.addEventListener("click", sotet )