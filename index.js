document.addEventListener('DOMContentLoaded', () => {
    const message = document.querySelector('.message');
    const fields = document.querySelectorAll('.field');
    const restartButton = document.querySelector('.restart-button');
    let currentPlayer = 'X';
    let moves = 0;
    let gameEnded = false;
  
    function checkWinner() {
      const combinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
      ];
  
      for (let combo of combinations) {
        const [a, b, c] = combo;
        if (fields[a].textContent !== '' &&
            fields[a].textContent === fields[b].textContent &&
            fields[a].textContent === fields[c].textContent) {
          fields[a].classList.add('winner');
          fields[b].classList.add('winner');
          fields[c].classList.add('winner');
          return true;
        }
      }
      return false;
    }
  
    function handleFieldClick(event) {
      const field = event.target;
      if (gameEnded || field.textContent !== '') return;
      field.textContent = currentPlayer;
      moves++;
  
      if (checkWinner()) {
        message.textContent = `Player ${currentPlayer} wins!`;
        gameEnded = true;
        return;
      }
  
      if (moves === 9) {
        message.textContent = "It's a draw!";
        gameEnded = true;
        return;
      }
  
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      message.textContent = `Player ${currentPlayer}'s turn`;
    }
  
    function restartGame() {
      fields.forEach(field => {
        field.textContent = '';
        field.classList.remove('winner');
      });
      currentPlayer = 'X';
      moves = 0;
      gameEnded = false;
      message.textContent = `Player ${currentPlayer}'s turn`;
    }
  
    fields.forEach(field => {
      field.addEventListener('click', handleFieldClick);
    });
  
    restartButton.addEventListener('click', restartGame);
  });
  