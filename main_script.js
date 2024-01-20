function hattervaltozas(){
    const body = document.body;
    const szin = body.style.backgroundColor;

    if (szin !== 'grey'){
        body.style.backgroundColor = 'grey';
    }else{
        body.style.backgroundColor = '';
    }
}