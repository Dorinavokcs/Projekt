const body = document.querySelector("body");
const gomb = document.querySelector(".gomb");

gomb.addEventListener("click", () => {

    if (body.style.backgroundColor !== "rgb(128, 128, 128)") {
        body.style.backgroundColor = rgb(${128},${128},${128});
        gomb.style.backgroundColor = rgb(${247}, ${202}, ${201});
    } else {
        body.style.backgroundColor = rgba(${247}, ${202}, ${201}, ${.7});
        gomb.style.backgroundColor = rgb(${128},${128},${128});
    }
});
function hideText() {
  let textElement = document.getElementById('animation');
  textElement.style.opacity = 0;
}