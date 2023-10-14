// Obtengo el elemento con el ID 'maze' del HTML en la variable maze
const maze = document.getElementById('maze');
const cells = []; // Usamos este array para guardar las celdas del laberinto

// Creamos un laberinto de 10x10
for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        const cell = document.createElement('div'); // Creamos una celda
        cell.classList.add('cell'); // Le metemos la clase 'cell' a la celda
        cells.push(cell); // Añadimos la celda al array 'cells'
        maze.appendChild(cell); // La metemos en el elemento 'maze' en el HTML
    }
}

// Añadimos paredes personalizadas para hacer un laberinto más desafiante
const wallPositions = [
    1, 9, 11, 12, 14, 15, 17, 18, 19, 24, 25, 30, 31, 33, 34, 37, 38,
    41, 43, 44, 46, 48, 53, 56, 58, 59, 60, 61, 62, 63, 65, 71, 75, 77, 79,
    81, 83, 84, 87, 89, 96, 97
];

// Metemos la clase 'wall' en las celdas que son paredes
wallPositions.forEach((position) => {
    cells[position].classList.add('wall');
});

// Creamos la celda final y le metemos la clase 'end'
const endCell = cells[99];
endCell.classList.add('end');

let playerPosition = 0; // Posición inicial del jugador
cells[playerPosition].classList.add('player'); // Le metemos la clase 'player' a la celda del jugador

// Escuchamos los eventos del teclado para mover al jugador
document.addEventListener('keydown', (event) => {
    const key = event.key;
    const oldPlayerCell = cells[playerPosition];

    if (key === 'ArrowRight' || key === 'd') {
        if (playerPosition % 10 < 9 && !cells[playerPosition + 1].classList.contains('wall')) {
            playerPosition++;
        }
    } else if (key === 'ArrowLeft' || key === 'a') {
        if (playerPosition % 10 > 0 && !cells[playerPosition - 1].classList.contains('wall')) {
            playerPosition--;
        }
    } else if (key === 'ArrowDown' || key === 's') {
        if (playerPosition < 90 && !cells[playerPosition + 10].classList.contains('wall')) {
            playerPosition += 10;
        }
    } else if (key === 'ArrowUp' || key === 'w') {
        if (playerPosition >= 10 && !cells[playerPosition - 10].classList.contains('wall')) {
            playerPosition -= 10;
        }
    }

    const newPlayerCell = cells[playerPosition];
    oldPlayerCell.classList.remove('player');
    newPlayerCell.classList.add('player');

    // Comprobamos si el jugador llega a la celda final
    if (newPlayerCell === endCell) {
        alert('¡Felicidades!');
        playerPosition = 0; // Reiniciamos la posición del jugador
        endCell.style.backgroundColor = 'green'; // Cambiamos el color de fondo de la celda final a verde
    }
});

// Función para mover al jugador en respuesta a los botones de dirección
function movePlayer(direction) {
    const oldPlayerCell = cells[playerPosition];
    let newPosition;

    if (direction === 'ArrowRight') {
        newPosition = playerPosition + 1;
    } else if (direction === 'ArrowLeft') {
        newPosition = playerPosition - 1;
    } else if (direction === 'ArrowDown') {
        newPosition = playerPosition + 10;
    } else if (direction === 'ArrowUp') {
        newPosition = playerPosition - 10;
    }

    if (newPosition >= 0 && newPosition < 100 && !cells[newPosition].classList.contains('wall')) {
        playerPosition = newPosition;
        const newPlayerCell = cells[playerPosition];
        oldPlayerCell.classList.remove('player');
        newPlayerCell.classList.add('player');

        // Comprobar si el jugador llega a la celda final
        if (newPlayerCell === endCell) {
            alert('¡Felicidades!');
            playerPosition = 0; // Reiniciar la posición del jugador
            endCell.style.backgroundColor = 'green'; // Cambiar el color de fondo de la celda final a verde
        }
    }
}

// Escuchar eventos de clic en los botones de dirección
document.getElementById('up').addEventListener('click', () => movePlayer('ArrowUp'));
document.getElementById('left').addEventListener('click', () => movePlayer('ArrowLeft'));
document.getElementById('right').addEventListener('click', () => movePlayer('ArrowRight'));
document.getElementById('down').addEventListener('click', () => movePlayer('ArrowDown'));