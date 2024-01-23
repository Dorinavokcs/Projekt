//alapértékek deklarálása//
const aknaszam= 10;
const dobozszam = 9;
let aknakhelye = [];
const sorhossz = 9;
var timestarted = false


//A játék felület megvalósítása, mindegyik kattintható 'dobozt' különböző azonosítóval látok el, amit aztán egy osztályba sorolok, így a későbbiekben könnyen meg lehet határozni//
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


//Az aknák elhelyezése randomizált módon az egész játék felületen//
const aknakelhelyezese = () => {
  aknakhelye = []; /*űrítem a korábban elhelyezett aknákat, emellett legelső induláskor létrehozzom őket.*/
  while (aknakhelye.length < aknaszam) {
    const sor = Math.floor(Math.random() * dobozszam);
    const oszlop = Math.floor(Math.random() * dobozszam);
    const újakna = `${sor}-${oszlop}`;

    if (!aknakhelye.includes(újakna)) {
      aknakhelye.push(újakna);
    }
  }
}


//A játék felületen való kattintás rögzítése. Megvizsgálja, hogy a felhasználó aknára lépett-e vagy sem, ennek függvényében cselekszik.//
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
    if (!timestarted){
      starttimer();
      timestarted = true;
    }
    
    const aknak_a_kozelben = kozeliaknakrogzitese(sor, oszlop);

    if (aknak_a_kozelben > 0){
      box.innerText = aknak_a_kozelben;
    } else {
    box.innerText = "0";
    }
    
    box.style.backgroundColor = "white";
    box.classList.add("clicked");
  }
}


//Megvizsgálja, hogy a felhasználó álltal kattintot 'doboz'-hoz mennyi szomszédos akna található. A kattintott 'doboz'-hoz képest szomszédos aknák mennyiségéhez képest kap értéket a kattintott 'doboz' 0 - nincs szomszédos akna; 1 - egy szomszédos akna található; 2 - két darab szomszédos akna található; 3 - három szomszédos akna található a kattintott 'doboz' körül.//
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
  } return count;
}


//A játék felület visszaállítása alapállásba, emellett az aknák elhelyezését is újragenerálja.//
function resetGame() {
  const boxes = document.querySelectorAll(".box");
  timestarted = false;
  clearInterval(countdown);
  let timer = document.getElementById("ido");
  timer.innerHTML = "0:00";
  boxes.forEach(box => {
    box.innerText = "";
    box.style.backgroundColor = "";
    box.classList.remove("clicked");
  });

  aknakelhelyezese();
}

//A komponensek meghívása.//
board();
aknakelhelyezese();


///idő szamlalas///
let countdown;
function starttimer() {
clearInterval(countdown);
let timer = document.getElementById("ido");
let time = 60;

countdown = setInterval(function() {
  time--;
  let minutes = Math.floor(time / 28);
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
function showHelp() {
    var helpText = document.getElementById('helpText');
    helpText.classList.toggle('active');
}
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
