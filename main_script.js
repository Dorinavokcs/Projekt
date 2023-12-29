function hattervaltozas(){
    var body = document.body;
    var szin = body.style.backgroundColor;

    if (szin !== 'grey'){
        body.style.backgroundColor = 'grey';
    }else{
        body.style.backgroundColor = '';
    }
}
