let currentPlayer = 'circle';

const udelej = (event) => {
  if (currentPlayer === 'cross') {
    event.target.classList.add('board__field--cross');

    currentPlayer = 'circle';
    event.target.disabled = true;
    document.body.querySelector('.kolecko').src = 'circle.svg';
  } else {
    event.target.classList.add('board__field--circle');

    currentPlayer = 'cross';
    event.target.disabled = true;
    document.body.querySelector('.kolecko').src = 'cross.svg';
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

document.body.querySelector('#b1').addEventListener('click', udelej);
document.body.querySelector('#b2').addEventListener('click', udelej);
document.body
  .querySelector('button:nth-child(3)')
  .addEventListener('click', udelej);
document.body
  .querySelector('button:nth-child(4)')
  .addEventListener('click', udelej);
document.body
  .querySelector('button:nth-child(5)')
  .addEventListener('click', udelej);
document.body
  .querySelector('button:nth-child(6)')
  .addEventListener('click', udelej);
document.body
  .querySelector('button:nth-child(7)')
  .addEventListener('click', udelej);
document.body
  .querySelector('button:nth-child(8)')
  .addEventListener('click', udelej);
document.body
  .querySelector('button:nth-child(9)')
  .addEventListener('click', udelej);
document.body
  .querySelector('button:nth-child(10)')
  .addEventListener('click', udelej);

document.body.querySelector('.domcek_tlacitko').addEventListener('click', domu);
document.body
  .querySelector('.restart_tlacitko')
  .addEventListener('click', restart);
