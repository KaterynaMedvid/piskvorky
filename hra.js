import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4';

let currentPlayer = 'circle';

const whoIsW = () => {
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
  return vsePolicka;
};

const robot = async () => {
  const response = await fetch(
    'https://piskvorky.czechitas-podklady.cz/api/suggest-next-move',
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        board: whoIsW(),
        player: 'x',
      }),
    },
  );
  const { pozice, yy } = await response.json();
  if (yy !== undefined) {
    return 'error';
  }
  return pozice.x + pozice.y * 10;
};

const whoIsWinner = () => {
  const vsePolicka = whoIsW();
  return findWinner(vsePolicka);
};

const udelej = async (event) => {
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

    const KrizekOFF = await robot();
    const novePolicka = document.body.querySelectorAll('.policko');
    if (KrizekOFF !== 'error') {
      novePolicka.forEach((button, index) => {
        if (index === KrizekOFF) {
          button.click();
        }
      });
    }
  }
  const vitez = whoIsWinner();
  if (vitez === 'o' || vitez === 'x') {
    const alertOX = () => {
      alert(`Vyhrál hráč z ${vitez}.`);
      location.reload();
    };
    setTimeout(alertOX, 300);
  } else if (vitez === 'tie') {
    const alertTIE = () => {
      alert('REMIZA');
      location.reload();
    };
    setTimeout(alertTIE, 300);
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
