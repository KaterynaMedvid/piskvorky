import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';

let currentPlayer = 'circle';

const whoIsWinner = () => {
  const vsePolicka = [];
  document.body.querySelectorAll('.policko').forEach((button) => {
    if (button.classList.contains('board__field--cross')) {
      vsePolicka.push('x');
    } else if (button.classList.contains('board__field--circle')) {
      vsePolicka.push('o');
    } else {
      vsePolicka.push('_');
    }
  });
  return findWinner(vsePolicka);
};

const udelej = (event) => {
  if (currentPlayer === 'cross') {
    event.target.className += ' board__field--cross';
    currentPlayer = 'circle';
    event.target.disabled = true;
    document.body.querySelector('.kolecko').src = 'circle.svg';
  } else {
    event.target.className += ' board__field--circle';
    currentPlayer = 'cross';
    event.target.disabled = true;
    document.body.querySelector('.kolecko').src = 'cross.svg';
  }
  const vitez = whoIsWinner();
  if (vitez === 'o' || vitez === 'x') {
    const alertOX = () => {
      alert(`Vyhrál hráč z ${vitez}.`);
      location.reload();
    };
    setTimeout(alertOX, 250);
  } else if (vitez === 'tie') {
    const alertTIE = () => {
      alert('REMIZA');
      location.reload();
    };
    setTimeout(alertTIE, 250);
  }
};

const restart = (event) => {
  const viber = confirm('Opravdu chceš restartovat hru?');
  if (!viber) {
    event.preventDefault();
  }
};

const domu = (event) => {
  const viber = confirm('Opravdu chceš přejít na začatečnu stránku?');
  if (!viber) {
    event.preventDefault();
  }
};

document.body.querySelector('.domcek_tlacitko').addEventListener('click', domu);
document.body
  .querySelector('.restart_tlacitko')
  .addEventListener('click', restart);

const buttons = document.body.querySelectorAll('.policko');
buttons.forEach((button) => {
  button.addEventListener('click', udelej);
});
