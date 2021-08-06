var tablero = [] ; 
const TIPO_ESCALERA = 0 ;
const TIPO_SERPIENTE = 1 ;
const TIPO_NORMAL = 2 ; 
var limiteTablero = 100 ; 
function jugar(){
    console.log('Empezando juego')
    generarTablero(5,5,100);
}

function generarTablero(totalEscaleras,totalSerpientes,numeroCasillas){
    var contadorEscaleras = 0 ; 
    var contadorSerpientes  = 0 ; 
    for(var iterador = 0 ; iterador < numeroCasillas ; iterador++){
        var tipoGenerar = getNumeroRandom();
        if(tipoGenerar == TIPO_ESCALERA && contadorEscaleras < totalEscaleras){
            let casilla = generaCasilla(iterador,tipoGenerar);
            tablero.push(casilla);
            contadorEscaleras++; 
        }else if(tipoGenerar == TIPO_SERPIENTE && contadorSerpientes < totalSerpientes && iterador > 15){
            let casilla = generaCasilla(iterador,tipoGenerar);
            tablero.push(casilla);
            contadorSerpientes++; 
        }else{
            let casilla = generaCasilla(iterador,TIPO_NORMAL);
            tablero.push(casilla);
        }
    }
    console.log(contadorEscaleras + ' ' + contadorSerpientes)
    console.log(tablero);
    
}

function getNumeroRandom(){
    var aleatorio = Math.random();
    return Math.random() > .5 ? TIPO_ESCALERA : TIPO_SERPIENTE ; 
}

function getNumeroRandomEntre(inicio,limite){
    return Math.floor(Math.random() * limite) + inicio;
}

function generaCasilla(numeroCasilla,tipoCasilla){
    var numeroCasilla = numeroCasilla + 1 ; 
    var sube = 0 ; 
    var baja = 0 ; 
    if(tipoCasilla == TIPO_ESCALERA){
        if(numeroCasilla < 50)
        sube = getNumeroRandomEntre(numeroCasilla,limiteTablero);
    }else if(tipoCasilla == TIPO_SERPIENTE){
        baja = getNumeroRandomEntre(0,numeroCasilla);
    }
    return {
        'numeroCasilla' : numeroCasilla,
        'sube' : sube,
        'baja' : baja
    };
}
