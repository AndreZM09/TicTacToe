let jugadorActual = 'X';
let tablero = ['', '', '', '', '', '', '', '', ''];
let juagoActivo = true;

const combinacionesGanadoras = [
[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6]
];

function reiniciarJuego() {
    // Reiniciar variables del juego
    jugadorActual = 'X';
    tablero = ['', '', '', '', '', '', '', '', ''];
    juagoActivo = true;

    // Limpiar el tablero en la interfaz de usuario
    for (let i = 0; i < tablero.length; i++) {
        document.getElementById(`cell${i}`).innerText = '';
    }

    // Actualizar el estado del juego
    document.getElementById('status').innerText = `Turno de jugador ${jugadorActual}`;
}

function verificarGanador() {
    for (let i = 0; i < combinacionesGanadoras.length; i++) {
        const [a, b, c] = combinacionesGanadoras[i];
        if (tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c]) {
        juagoActivo = false;
        return tablero[a];
        }
    }
    if (!tablero.includes('')) {
        juagoActivo = false;
        return 'Draw';
    }
    return null;
}

function cellClicked(index) {
    if (!juagoActivo || tablero[index] !== '' || jugadorActual === 'O') return; 
  
    tablero[index] = jugadorActual;
    document.getElementById(`cell${index}`).innerText = jugadorActual;
  
    jugadorActual = jugadorActual === 'X' ? 'O' : 'X';
    document.getElementById('status').innerText = jugadorActual === 'X' ? `Turno de jugador ${jugadorActual}` : `Turno de la máquina`;
  
    setTimeout(function() {
      const ganador = verificarGanador(); // Verificar si hay un ganador después de que el jugador ha hecho su movimiento
      if (ganador) {
        if (ganador === 'Draw') {
          alert("Es un empate!");
        } else {
          alert(`Jugador ${ganador} gana!`);
        }
        juagoActivo = false;
        return; // Detener la ejecución si hay un ganador o empate
      }
  
      if (jugadorActual === 'O') {
        setTimeout(movimientoMaquina, 1000);
      }
    }, 100); // Temporizador de 0 ms para asegurar que la verificación del ganador se realice después de que se haya actualizado la interfaz de usuario
}

function movimientoMaquina() {
    let celdasVacias = [];
    let posicionJugador = [];
    let posicionMaquina = [];

    // Identificar celdas vacías y posiciones de jugador/máquina
    for (let i = 0; i < tablero.length; i++) {
        if (tablero[i] === '') {
            celdasVacias.push(i);
        } else if (tablero[i] === 'X') {
            posicionJugador.push(i);
        } else if (tablero[i] === 'O') {
            posicionMaquina.push(i);
        }
    }

    // Verificar movimientos para ganar de la máquina
    for (let i = 0; i < celdasVacias.length; i++) {
        const testtablero = [...tablero];
        testtablero[celdasVacias[i]] = 'O';
        for (let j = 0; j < combinacionesGanadoras.length; j++) {
            const [a, b, c] = combinacionesGanadoras[j];
            if (testtablero[a] === 'O' && testtablero[b] === 'O' && testtablero[c] === 'O') {
                tablero[celdasVacias[i]] = 'O';
                document.getElementById(`cell${celdasVacias[i]}`).innerText = 'O';

                // Actualizar el estado del juego y el turno del jugador
                jugadorActual = 'X';
                document.getElementById('status').innerText = `Turno de jugador ${jugadorActual}`;

                const ganador = verificarGanador(); // Verificar el ganador después de actualizar el tablero
                if (ganador) {
                    if (ganador === 'Draw') {
                        alert("Es un empate!");
                      } else {
                        alert(`Jugador ${ganador} gana!`);
                      }
                    juagoActivo = false;
                }
                return;
            }
        }
    }

    for (let i = 0; i < celdasVacias.length; i++) {
        const testtablero = [...tablero];
        testtablero[celdasVacias[i]] = 'X';
        for (let j = 0; j < combinacionesGanadoras.length; j++) {
            const [a, b, c] = combinacionesGanadoras[j];
            if (testtablero[a] === 'X' && testtablero[b] === 'X' && testtablero[c] === 'X') {
                tablero[celdasVacias[i]] = 'O';
                document.getElementById(`cell${celdasVacias[i]}`).innerText = 'O';
                const ganador = verificarGanador();
                if (ganador) {
                    if (ganador === 'Draw') {
                        alert("Es un empate!");
                      } else {
                        alert(`Jugador ${ganador} gana!`);
                      }
                    juagoActivo = false;
                } else {
                    jugadorActual = 'X';
                    document.getElementById('status').innerText = `Turno de jugador ${jugadorActual}`;
                }
                return;
            }
        }
    }

    if (celdasVacias.length === 0) {
        alert("It's a Draw!");
        juagoActivo = false;
        return;
    }

    const randomIndex = Math.floor(Math.random() * celdasVacias.length);
    const moveIndex = celdasVacias[randomIndex];
    tablero[moveIndex] = 'O';
    document.getElementById(`cell${moveIndex}`).innerText = 'O';

    jugadorActual = 'X';
    document.getElementById('status').innerText = `Turno de jugador ${jugadorActual}`;

    // Verificar el ganador después de que se haya actualizado la interfaz de usuario con el movimiento de la máquina
    setTimeout(() => {
        const ganador = verificarGanador();
        if (ganador) {
            if (ganador === 'Draw') {
                alert("Es un empate!");
              } else {
                alert(`Jugador ${ganador} gana!`);
              }
            juagoActivo = false;
        }
    }, 100);

}
