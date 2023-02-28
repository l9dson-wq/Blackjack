/*
    2C = Two of clubs (treboles)
    2D = Two of Diamond
    2H = Two of Hearts
    2S = Two of Spades
*/

let deck         = [];
const TIPOS      = ['C','D','H','S'];
const ESPECIALES = ['A','J','Q','K'];

let puntosJugador = 0;
let puntosComputadora = 0;

// Referencias del HTML
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');

const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');
const puntosHTML = document.querySelectorAll('small');

//Esta funcion crea un nuevo deck o una nueva baraja
const crearDeck = () => {

    for( let i = 2; i <= 10; i++ ){
        for( let tipo of TIPOS ){
            deck.push( i + tipo );
        }
    }

    for( let tipo of TIPOS ){
        for( let especial of ESPECIALES ){
            deck.push( especial + tipo );
        }
    }

    // console.log(deck);
    deck = _.shuffle( deck );
    return deck;
}

crearDeck();
console.log(deck);

// Esta funcion me permite tomar una carta
const pedirCarta = () => {

    if( deck.length === 0 ){
        throw 'No hay cartas en el deck';
    }

    const CARTA = deck.pop();

    console.log(deck);
    return CARTA;
}

//pedirCarta();

const valorCarta = ( carta ) => {

    const VALOR = carta.substring(0, carta.length - 1);

    return ( !isNaN(VALOR) ) ? VALOR * 1 : 
            ( VALOR === 'A' ) ? 11 : 10;
}

// turno de la computadora
const turnoComputadora = ( puntosMinimos ) => {
    do {

        const carta = pedirCarta();

        puntosComputadora = puntosComputadora + valorCarta(carta);

        puntosHTML[1].innerText = puntosComputadora;

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append( imgCarta );

        if ( puntosMinimos > 21 ) {
            break;
        }

    }while( (puntosComputadora < puntosMinimos && (puntosMinimos <= 21) ) );

    setTimeout(() => {

        if( puntosComputadora === puntosMinimos ){
            alert('Nadie gana');
        } else if ( puntosMinimos > 21 ) {
            alert('Computadora gana');
        } else if ( puntosComputadora > 21 ) {
            alert('Jugador gana');
        }else {
            alert('Computadora gana');
        }

    }, 10);
}

const bloquear_turnoPc = () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora( puntosJugador );
}

//Eventos
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(carta);

    puntosHTML[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append( imgCarta );

    if ( puntosJugador > 21 ){

        bloquear_turnoPc();

    } else if ( puntosJugador === 21 ) {

        bloquear_turnoPc();
    }

});

// TODO: 
btnDetener.addEventListener('click', () => {
    bloquear_turnoPc();
});

// TODO: 
btnNuevo.addEventListener('click', () => {
    
    deck = [];
    deck = crearDeck();

    puntosJugador = 0;
    puntosComputadora = 0;
    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText =  0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';

    btnPedir.disabled = false;
    btnDetener.disabled = false;
});