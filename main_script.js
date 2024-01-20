function hattervaltozas(){
    var body = document.body;
    var szin = body.style.backgroundColor;
    const main = document.querySelector(".maincontainer");

    if (szin != 'grey'){
        body.style.backgroundColor = 'grey';
        main.style.backgroundColor = `rgba(${251},${120},${120},${.9})`;
    }else{
        body.style.backgroundColor = '';
    }
}