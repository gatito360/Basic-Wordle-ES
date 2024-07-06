const words = [
    'JUEGO', 'CASAS', 'PERRO', 'GATOS', 'LIBRO', 'ARBOL', 'SALTA', 'NUBES', 'RUIDO', 'CALOR',
    'FRIO', 'LLAVE', 'COLOR', 'RATON', 'TECLA', 'PLUMA', 'MESA', 'LUZAR', 'VELOS', 'AMIGO'
]; // Catálogo de palabras
const wordle = words[Math.floor(Math.random() * words.length)]; // Selección aleatoria de la palabra
const board = document.getElementById('board');
const keyboard = document.getElementById('keyboard');
const messageContainer = document.getElementById('message-container');
let currentRow = 0;
let currentTile = 0;
let isGameOver = false;

// Crear el tablero
function createBoard() {
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            tile.setAttribute('id', 'row-' + i + '-tile-' + j);
            board.appendChild(tile);
        }
    }
}

// Crear el teclado
function createKeyboard() {
    const keys = 'QWERTYUIOPASDFGHJKLÑZXCVBNM'.split('');
    keys.forEach(key => {
        const buttonElement = document.createElement('button');
        buttonElement.textContent = key;
        buttonElement.setAttribute('id', key);
        buttonElement.addEventListener('click', () => handleKeyClick(key));
        buttonElement.classList.add('key');
        keyboard.appendChild(buttonElement);
    });
    const enterButton = document.createElement('button');
    enterButton.textContent = 'ENVIAR';
    enterButton.addEventListener('click', checkRow);
    enterButton.classList.add('key');
    keyboard.appendChild(enterButton);

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '&#x232B;'; // Icono de borrar
    deleteButton.addEventListener('click', deleteLetter);
    deleteButton.classList.add('key');
    keyboard.appendChild(deleteButton);
}

function handleKeyClick(key) {
    if (currentTile < 5 && currentRow < 6 && !isGameOver) {
        const tile = document.getElementById('row-' + currentRow + '-tile-' + currentTile);
        tile.textContent = key;
        currentTile++;
    }
}

function checkRow() {
    const guess = [];
    for (let i = 0; i < 5; i++) {
        const tile = document.getElementById('row-' + currentRow + '-tile-' + i);
        guess.push(tile.textContent);
    }
    if (guess.join('') === wordle) {
        showMessage('¡Lo lograste!');
        isGameOver = true;
        updateTiles(guess, true); // Actualiza todas las letras a verde
        confettiEffect();
    } else {
        if (currentRow >= 5) {
            showMessage('Fin del juego. La palabra era ' + wordle);
            isGameOver = true;
        } else {
            updateTiles(guess, false);
            currentRow++;
            currentTile = 0;
        }
    }
}

function updateTiles(guess, allCorrect) {
    for (let i = 0; i < 5; i++) {
        const tile = document.getElementById('row-' + currentRow + '-tile-' + i);
        const letter = guess[i];
        if (allCorrect) {
            tile.classList.add('correct');
        } else {
            if (wordle.includes(letter)) {
                if (wordle[i] === letter) {
                    tile.classList.add('correct');
                } else {
                    tile.classList.add('present');
                }
            } else {
                tile.classList.add('absent');
            }
        }
    }
}

function deleteLetter() {
    if (currentTile > 0 && !isGameOver) {
        currentTile--;
        const tile = document.getElementById('row-' + currentRow + '-tile-' + currentTile);
        tile.textContent = '';
    }
}

function showMessage(message) {
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    messageContainer.appendChild(messageElement);
}

// Efecto de confeti
function confettiEffect() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

// Inicializar el juego
createBoard();
createKeyboard();