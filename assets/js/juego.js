let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];

let puntosJugador = 0;
let puntosComputadora = 0;

// REFERENCIAS HTML
const btnPedir = document.querySelector("#btnPedir");

const divCartasJugador = document.querySelector("#jugador-cartas");
const divCartasComputadora = document.querySelector("#computadora-cartas");

const smallTag = document.querySelectorAll("small");

// ESTA FUNCION CREA UNA BARAJA ALEATORIA
const crearDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
  }

  for (let tipo of tipos) {
    for (let especial of especiales) {
      deck.push(especial + tipo);
    }
  }
  deck = _.shuffle(deck);
  console.log(deck);
  return deck;
};

crearDeck();

const pedirCarta = () => {
  if (deck.length === 0) {
    throw "No hay mas cartas we";
  }
  const carta = deck.pop();
  return carta;
};

pedirCarta();

const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);
  return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
};

// TURNO DE LA COMPUTADORA
const turnoComputadora = (puntosMinimos) => {
  do {
    const carta = pedirCarta();

    puntosComputadora = puntosComputadora + valorCarta(carta);
    smallTag[1].innerText = puntosComputadora;

    // <img  src="cartas/cartas/10C.png" alt="" />
    const imgCarta = document.createElement("img");
    imgCarta.src = `cartas/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    divCartasComputadora.append(imgCarta);
    if (puntosMinimos > 21) {
      break;
    }
  } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);
};

// EVENTOS
btnPedir.addEventListener("click", () => {
  const carta = pedirCarta();
  puntosJugador = puntosJugador + valorCarta(carta);
  smallTag[0].innerText = puntosJugador;

  // <img  src="cartas/cartas/10C.png" alt="" />
  const imgCarta = document.createElement("img");
  imgCarta.src = `cartas/cartas/${carta}.png`;
  imgCarta.classList.add("carta");
  divCartasJugador.append(imgCarta);

  if (puntosJugador > 21) {
    console.warn("Perdiste crack");
    btnPedir.disabled = true;
    turnoComputadora(puntosJugador);
  } else if (puntosJugador === 21) {
    console.warn("Ganaste crack");
    btnPedir.disabled = true;
    turnoComputadora(puntosJugador);
  }
});
