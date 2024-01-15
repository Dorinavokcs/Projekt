const aknaszam= 10;
const dobozszam = 9;
let aknakhelye = [];
const sorhossz = 9;


const board = () =>{
  const jatekfelulet = document.querySelector(".boxok");
  for (let i = 0; i < sorhossz; i++) {
    for (let j = 0; j < sorhossz; j++) {
      const box = document.createElement("div");
      box.classList.add("box");
      box.dataset.i = i;
      box.dataset.j = j;
      box.addEventListener("click", boxmegjelenites);
      jatekfelulet.appendChild(box);
    }
  }
}

const aknakelhelyezese = () => {
  aknakhelye = [];
  while (aknakhelye.length < aknaszam) {
    const sor = Math.floor(Math.random() * dobozszam);
    const oszlop = Math.floor(Math.random() * dobozszam);
    const újakna = `${sor}-${oszlop}`;

    if (!aknakhelye.includes(újakna)) {
      aknakhelye.push(újakna);
    }
  }

}
const boxmegjelenites = (event) =>{
  const sor = parseInt(event.target.dataset.i);
  const oszlop = parseInt(event.target.dataset.j);
  const box = document.querySelector(`.box[data-i="${sor}"][data-j="${oszlop}"]`);
  const boxes = document.querySelectorAll(".box");
  if (aknakhelye.includes(`${sor}-${oszlop}`)) {
    alert("A játéknak vége! Aknára léptél.");
    box.innerText = "💣";
    resetGame();
  } else {
    const aknak_a_kozelben = kozeliaknakrogzitese(sor, oszlop);

    if (aknak_a_kozelben > 0){
      box.innerText = aknak_a_kozelben;
    } else {
    box.innerText = "";
    }
    
    box.style.backgroundColor = "#ddd";
  }
}

function kozeliaknakrogzitese(sor, oszlop) {
  let count = 0;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const szomszedossor = sor + i;
      const szomszedososzlop = oszlop + j;

      if (szomszedossor >= 0 && szomszedossor < sorhossz && szomszedososzlop >= 0 && szomszedososzlop < sorhossz) {
        if (aknakhelye.includes(`${szomszedossor}-${szomszedososzlop}`)) {
          count++;
        }
      }
    }
  }

  return count;
}

function resetGame() {
  const boxes = document.querySelectorAll(".box");

  boxes.forEach(box => {
    box.innerText = "";
    box.style.backgroundColor = "";
  });

  aknakelhelyezese();
}

board();
aknakelhelyezese();


///idő szamlalas///
let countdown;
function starttimer() {
clearInterval(countdown);
let timer = document.getElementById("timer");
let time = 60;

countdown = setInterval(function() {
  time--;
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  timer.innerHTML = minutes + ":" + seconds;

  if (time <= 0) {
    clearInterval(countdown);
    timer.innerHTML = "Vesztettel!";
  }
}, 1000);
}