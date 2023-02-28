// simple funcion anonima auto invocada
const miModulo = (() => {

    'use strict'

    let deck         = [];

    const TIPOS      = ['C','D','H','S'],
          ESPECIALES = ['A','J','Q','K'];

    let puntosJugadores = [];

    // Referencias del HTML
    const btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
          puntosHTML = document.querySelectorAll('small');


    // Esta funcion inicializa el juego     
    const inicializarJuego = ( numJugadores = 2 ) => {
        deck = crearDeck();

        puntosJugadores = [];
        for( let i = 0; i < numJugadores; i++){
            puntosJugadores.push(0);
        }

        puntosHTML.forEach( elem => elem.innerText  = 0 );
        divCartasJugadores.forEach( elem => elem.innerHTML = '' );

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }

    //Esta funcion crea un nuevo deck o una nueva baraja
    const crearDeck = () => {
        deck = [];

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

        return _.shuffle( deck );
    }

    // Esta funcion me permite tomar una carta
    const pedirCarta = () => {
        if( deck.length === 0 ){
            throw 'No hay cartas en el deck';
        }
        return deck.pop();
    }

    //pedirCarta();
    const valorCarta = ( carta ) => {
        const VALOR = carta.substring(0, carta.length - 1);
        return ( !isNaN(VALOR) ) ? VALOR * 1 : 
                ( VALOR === 'A' ) ? 11 : 10;
    }

    // Turno: 0 = primer juegador y el ultimo sera la computadora
    const acumularPuntos = ( carta, turno ) => {

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];

    }

    const crearCarta = ( carta, turno ) => {

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append( imgCarta );

    }

    const determinarGanador = () => {

        const [ puntosMinimos, puntosComputadora ] = puntosJugadores;

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

        }, 100 );

    }

    // turno de la computadora
    const turnoComputadora = ( puntosMinimos ) => {

        let puntosComputadora =  0;

        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos( carta, puntosJugadores.length - 1);
            crearCarta( carta, puntosJugadores.length - 1);

            if ( puntosMinimos > 21 ) {
                break;
            }

        }while( (puntosComputadora < puntosMinimos && (puntosMinimos <= 21) ) );

        determinarGanador();
    }

    //Eventos
    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();
        const puntosJugador = acumularPuntos( carta, 0);

        crearCarta( carta, 0);

        if ( puntosJugador > 21 ){

            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugador );

        } else if ( puntosJugador === 21 ) {

            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugador );
        }

    });

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );
    });

    btnNuevo.addEventListener('click', () => {
        
        inicializarJuego();
        
    });

    return {
        nuevoJuego: inicializarJuego
    };

})();