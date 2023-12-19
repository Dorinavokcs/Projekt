///////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', function () {
  const elem = document.querySelector('.hello-szoveg')
  elem.style.backgroundColor = "rgb(119,69,39)";
  elem.style.margin = "12px";
  elem.style.padding = "20px";
  elem.style.borderRadius ="10px"
  const text = document.querySelector('.hello-szoveg');
  setTimeout(function () {
    text.style.opacity = '0';
  }, 3000);
});