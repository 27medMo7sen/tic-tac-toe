let playerVsAi = 0, playerVsPlayer = 0;
let matrix = [['', '', ''], ['', '', ''], ['', '', '']];
let arr = ['00', '01', '02', '10', '11', '12', '20', '21', '22'];
let op1 = document.querySelector("#op1");
let op2 = document.querySelector("#op2");
let sy1 = document.querySelector("#sy1");
let sy2 = document.querySelector("#sy2");
let player1, player2, turn = 1, player1Score = 0, player2Score = 0,
  name1, name2, ref, winner = 0 , level=1;
let board = document.querySelector(".board");
let formPP = document.querySelector(".formPP");
let formPA = document.querySelector(".formPA");
let ppp1 = document.querySelector("#playerOne");
let ppp2 = document.querySelector("#playerTwo");
let pap = document.querySelector("#hPlayer");
let exitpp = document.querySelector("#exitpp");
let exitpa = document.querySelector("#exitpa");
let submitpp = document.querySelector("#submitpp");
let submitpa = document.querySelector("#submitpa");
let cells = document.querySelectorAll(".cell");
let scoreBoard = document.querySelector(".scoreBoard");
let internal = document.querySelector(".internal");
let main = document.querySelector('.main');
let rld;
let easy = document.querySelector("#easy");
let med = document.querySelector("#med");
let une = document.querySelector("#une");
let dif = document.querySelector(".difficulty");
easy.addEventListener('click',()=>{
  level=1;
  easy.style.backgroundColor="#4C4C4C"
  med.style.backgroundColor="black";
  une.style.backgroundColor="black";
  refresh();
})
med.addEventListener('click',()=>{
  level=2;
  easy.style.backgroundColor="black";
  med.style.backgroundColor="#4C4C4C";
  une.style.backgroundColor="black";
  refresh();
})
une.addEventListener('click',()=>{
  level=3;
  med.style.backgroundColor="black";
  easy.style.backgroundColor="black";
  une.style.backgroundColor="#4C4C4C";
  refresh();
})
function check() {
  if (matrix[0][0] === matrix[0][1] && matrix[0][1] === matrix[0][2] && matrix[0][0] !== '') return 1;
  if (matrix[1][0] === matrix[1][1] && matrix[1][1] === matrix[1][2] && matrix[1][0] !== '') return 1;
  if (matrix[2][0] === matrix[2][1] && matrix[2][1] === matrix[2][2] && matrix[2][0] !== '') return 1;
  if (matrix[0][0] === matrix[1][0] && matrix[1][0] === matrix[2][0] && matrix[0][0] !== '') return 1;
  if (matrix[0][1] === matrix[1][1] && matrix[1][1] === matrix[2][1] && matrix[0][1] !== '') return 1;
  if (matrix[0][2] === matrix[1][2] && matrix[1][2] === matrix[2][2] && matrix[0][2] !== '') return 1;
  if (matrix[0][0] === matrix[1][1] && matrix[1][1] === matrix[2][2] && matrix[0][0] !== '') return 1;
  if (matrix[0][2] === matrix[1][1] && matrix[1][1] === matrix[2][0] && matrix[0][2] !== '') return 1;
  let full = 1;
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
      if (matrix[i][j] === '')
        full = 0;
  if (full === 1)
    return -1;
  return 0;
}

op1.addEventListener('click', () => {
  playerVsAi = true;
  op1.style.display = "none";
  op2.style.display = "none";
  sy1.style.display = "flex";
  sy2.style.display = "flex";
  dif.style.display="flex";
  formPA.style.display="flex";
})
op2.addEventListener('click', () => {
  playerVsPlayer = true;
  op1.style.display = "none";
  op2.style.display = "none";
  sy1.style.display = "flex";
  sy2.style.display = "flex";
  formPP.style.display = "flex";
})
sy1.addEventListener('click', () => {
  player1 = 'X';
  player2 = 'O';
  sy1.style.display = "none";
  sy2.style.display = "none";
  turn = 1;
  ref = 1;
  board.style.display = "flex";
})
sy2.addEventListener('click', () => {
  player1 = 'O';
  player2 = 'X';
  turn = 2;
  ref = 2;
  sy1.style.display = "none";
  sy2.style.display = "none";
  board.style.display = "flex";
})
exitpp.addEventListener('click', () => {
  formPP.style.display = "none";
  sy1.style.display = "none";
  sy2.style.display = "none"  ;
  op1.style.display="flex";
  op2.style.display="flex";
})
exitpa.addEventListener('click', () => {
  formPA.style.display = "none";
  sy1.style.display = "none";
  sy2.style.display = "none";
  op1.style.display="flex";
  op2.style.display="flex";
})

function modifySc() {
  scoreBoard.remove();
  let para1 = document.createElement('p');
  let para2 = document.createElement('p');
  let txt1 = document.createTextNode(`${name1} : ${player1Score} / 5`);
  let txt2 = document.createTextNode(`${name2} : ${player2Score} / 5`);
  para1.appendChild(txt1);
  para2.appendChild(txt2);
  let New = document.createElement('div');
  New.classList.add('scoreBoard');
  New.appendChild(para1);
  New.appendChild(para2);
  internal.prepend(New);
  scoreBoard = New;
  scoreBoard.style.display = "flex";
}

function refresh() {
  cells.forEach(function (div) {
    const child = div.querySelector("p");
    if (child)
      child.remove();
  })
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
      matrix[i][j] = '';
  winner = 0;
}

function createWinnerMassage(name) {
  let winMassage = document.createElement('p');
  let txt = document.createTextNode(`${name} wins!!`);
  winMassage.appendChild(txt);
  winMassage.classList.add('winner');
  internal.appendChild(winMassage);
  let btn = document.createElement("button");
  btn.textContent = "Play again?";
  btn.classList.add("rld");
  internal.appendChild(btn);
  rld = document.querySelector(".rld");
  rld.style.display = "block";
  rld.addEventListener('click', function(){
    location.reload();
  });
}


submitpp.addEventListener('click', () => {
  name1 = ppp1.value;
  name2 = ppp2.value;
  formPP.style.display = "none";
  modifySc();
})
submitpa.addEventListener('click', () => {
  name1 = pap.value;
  name2 = "AI";
  formPA.style.display = "none";
  modifySc();
})
cells.forEach(function (div) {
  div.addEventListener('click', () => {
    if (playerVsPlayer) {
      if (turn === 1 && ref !== -1 && !winner) {
        let pos = div.id;
        if (matrix[parseInt(pos[0], 10)][parseInt(pos[1], 10)] === '') {
          matrix[parseInt(pos[0], 10)][parseInt(pos[1], 10)] = player1;
          let paragraph = document.createElement('p');
          let txt = document.createTextNode(player1);
          paragraph.appendChild(txt);
          paragraph.style.color = "#8f0505";
          paragraph.style.fontSize = "84px";
          paragraph.style.fontWeight = "bold";
          div.appendChild(paragraph);
          if (check() === 1) {
            winner = 1;
            setTimeout(function () {
              player1Score++;
              refresh();
              turn = ref;
              if (player1Score === 5) {
                createWinnerMassage(name1);
                ref = -1;
              }
              modifySc();
            }, 500);
          } else if (check() === -1) {
            setTimeout(function () {
              refresh();
            }, 500);
          } else
            turn = 2;
        }
      } else if (turn === 2 && ref !== -1 && !winner) {
        let pos = div.id;
        if (matrix[parseInt(pos[0], 10)][parseInt(pos[1], 10)] === '') {
          matrix[parseInt(pos[0], 10)][parseInt(pos[1], 10)] = player2;
          let paragraph = document.createElement('p');
          let txt = document.createTextNode(player2);
          paragraph.appendChild(txt);
          paragraph.style.color = "#0000a8";
          paragraph.style.fontSize = "84px";
          paragraph.style.fontWeight = "bold";
          div.appendChild(paragraph);
          if (check() === 1) {
            winner = 1;
            setTimeout(function () {
              refresh();
              turn = ref;
              player2Score++;
              if (player2Score === 5) {
                createWinnerMassage(name2);
                ref = -1;
              }
              modifySc();
            }, 500);
          } else if (check() === -1) {
            setTimeout(function () {
              refresh();
            })
          } else
            turn = 1;
        }
      }
    }
    else if(playerVsAi){
      if (turn === 1 && ref !== -1 && !winner) {
        let pos = div.id;
        if (matrix[parseInt(pos[0], 10)][parseInt(pos[1], 10)] === '') {
          matrix[parseInt(pos[0], 10)][parseInt(pos[1], 10)] = player1;
          let paragraph = document.createElement('p');
          let txt = document.createTextNode(player1);
          paragraph.appendChild(txt);
          paragraph.style.color = "#8f0505";
          paragraph.style.fontSize = "84px";
          paragraph.style.fontWeight = "bold";
          div.appendChild(paragraph);
          if (check() === 1) {
            winner = 1;
            setTimeout(function () {
              player1Score++;
              refresh();
              turn = ref;
              if (player1Score === 5) {
                createWinnerMassage(name1);
                ref = -1;
              }
              modifySc();
            }, 500);
          } else if (check() === -1) {
            setTimeout(function () {
              refresh();
            }, 500);
          } else
            turn = 2;
        }
      }
     else if (turn === 2 && ref !== -1 && !winner) {

      }
    }
  })
})


