//Define HTML elements
const board = document.getElementById("game-board");
const instructionText = document.getElementById("instruction-text");
const logo = document.getElementById("logo");
const score = document.getElementById('score');
const highScoreText = document.getElementById('highScore');

//Define game variables
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let direction = "right";
let highScore = 0;
let gameInterval;
let gameSpeedDelau = 200;
let gameStarted = false;

//Draw game map,snak.,food
function draw() {
  board.innerHTML = "";
  drawSnake();
  drawfood();
  updateScore();
}

//Draw snake
function drawSnake() {
  if (gameStarted) {
    snake.forEach((segment) => {
      const snakeElement = createGemeElement("div", "snake");
      setposition(snakeElement, segment);
      board.appendChild(snakeElement);
    });
  }

}

//Create a snake or food cube/div
function createGemeElement(tag, className) {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

//set the psoition of snake or food
function setposition(element, psoition) {
  element.style.gridColumn = psoition.x;
  element.style.gridRow = psoition.y;
}

//Testing draw funciton
// draw();

//Draw food function
function drawfood() {
  if(gameStarted){
    const foodElement = createGemeElement("div", "food");
    setposition(foodElement, food);
    board.appendChild(foodElement);
  }

}

//generateFood
function generateFood() {
  const x = Math.floor(Math.random() * gridSize + 1);
  const y = Math.floor(Math.random() * gridSize + 1);
  return { x, y };
}

//Moving the snake
function move() {
  const head = { ...snake[0] };
  switch (direction) {
    case "up":
      head.y--;

      break;

    case "down":
      head.y++;

      break;

    case "left":
      head.x--;

      break;

    case "right":
      head.x++;

      break;
  }

  snake.unshift(head);

  //   snake.pop();
  if (head.x === food.x && head.y === food.y) {
    food = generateFood();
    increaseSpeed();
    clearInterval(gameInterval);
    gameInterval = setInterval(() => {
      move();
      checkCollision();
      draw();
    }, gameSpeedDelau);
  } else {
    snake.pop();
  }
}

//Test moving
// setInterval(() => {
//     move();//Move first
//     draw();

// },200);

//start Game function
function startGame() {
  gameStarted = true;
  instructionText.style.display = 'none';
  logo.style.display = 'none';
  gameInterval = setInterval(() => {
    move();
    checkCollision();
    draw();
  }, gameSpeedDelau);
}

//Keypress event listener
function handlekeyPress(event) {
  if (
    (!gameStarted && event.code === 'Space') ||
    (!gameStarted && event.key === '')
  ) {
    startGame();
  } else {
    switch (event.key) {
      case "ArrowUp":
        direction = "up";
        break;

      case "ArrowDown":
        direction = "down";
        break;

      case "ArrowLeft":
        direction = "left";
        break;

      case "ArrowRight":
        direction = "right";
        break;
    }
  }
}

document.addEventListener('keydown',handlekeyPress);

function increaseSpeed(){
  if(gameSpeedDelau > 150){

    gameSpeedDelau-=5;

  }else if(gameSpeedDelau > 100){

    gameSpeedDelau -= 3;

  }else if(gameSpeedDelau > 50){

    gameSpeedDelau -= 2;

  }else if(gameSpeedDelau > 25){

    gameSpeedDelau -= 1;

  }
}


function checkCollision(){
  const head = snake[0];
  if(head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize){

    resetGame();
  }

  for(let i = 1; i < snake.length;i++){
    if(head.x === snake[i].x &&head.y === snake[i].y){
      resetGame();

    }
  }
}

function resetGame(){
  updateHighScore();
  stopGame();
  snake = [{x:10, y:10}];
  food = generateFood();
  direction = 'right';
  gameSpeedDelau = 200;
  updateScore();

}

function updateScore(){
  const currentScore = snake.length - 1;
  score.textContent = currentScore.toString().padStart(3,'0');
}

function stopGame(){
  clearInterval(gameInterval);
  gameStarted = false;
  instructionText.style.display = 'block';
  logo.style.display = 'block';
}

function updateHighScore(){
  const currentScore = snake.length - 1;
  if (currentScore > highScore) {
    highScore = currentScore;
    highScoreText.textContent = highScore.toString().padStart(3,'0');
  }
  highScoreText.style.display = 'block';
}