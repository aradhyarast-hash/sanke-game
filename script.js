const board = document.querySelector(".board");
const blockHeight = 50;
const blockWidth = 50;
const startButton = document.querySelector(".btn-start");
const restartGameButton = document.querySelector(".btn-restart");
const modal = document.querySelector(".modal");
const startGameModal = document.querySelector(".start-game");
const gameOverModal = document.querySelector(".game-over");

const highScoreElement = document.querySelector("#high-score");
const scoreElement = document.querySelector("#score");
const timeElement = document.querySelector("#time");

let highScore = localStorage.getItem("highScore") || 0;
let score = 0;
let time = `00-00`;

highScoreElement.innertext = highScore;

// we calculated the number of rows and columns will be required
const rows = Math.floor(board.clientHeight / blockHeight);
const cols = Math.floor(board.clientWidth / blockWidth);

let IntervalId = null;
let timerIntervalId = null;
let food = {x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols)};

const blocks = [];
let snake = [ {
    x: 1, y: 3
} ];

let direction = "right";
// we repeted the single block row*col+1 times 
for(let row = 0; row < rows; row++){
    for(let col = 0; col < cols; col++){
        const block = document.createElement("div");
        block.classList.add("block");
        board.appendChild(block);
        blocks[`${row}-${col}`] = block;
    }
}

function restartGame(){
    score = 0;
    time = 0;
    clearInterval(IntervalId);
    clearInterval(timerIntervalId);
    scoreElement.innerText = score;
    timeElement.innerText = time;
    highScoreElement.innerText = highScore;
    blocks[`${food.x}-${food.y}`].classList.remove("food");

    snake.forEach(segment=>{
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
    });

    snake.forEach(segment => {
            const cell = blocks[`${segment.x}-${segment.y}`];
            cell.classList.remove("lostfill");
    });

    modal.style.display = "none";
    snake = [ {
    x: 1, y: 3
    } ];
    food = {x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols)};
    IntervalId = setInterval(render, 300);
    timerIntervalId = setInterval(() => {                   // restart timer
        time++;
        timeElement.innerText = time;
    }, 1000);
    // default direction
    direction = "down";
}

 
function render(){ 

    let head = null;
    blocks[`${food.x}-${food.y}`].classList.add("food");

    if(direction === "left"){
        head = {x: snake[0].x, y: (snake[0].y - 1)};
    }
    else if(direction === "right"){
        head = {x: snake[0].x, y: (snake[0].y + 1)}
    }
    else if(direction === "down"){
        head = {x: snake[0].x+1, y: snake[0].y};
    }
    else if(direction === "up"){
        head = {x: snake[0].x-1, y: snake[0].y};
    }
    
    if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
        clearInterval(IntervalId);
        clearInterval(timerIntervalId);
        time = `00-00`;
        snake.forEach(segment => {
            const cell = blocks[`${segment.x}-${segment.y}`];
            cell.classList.remove("fill");
            cell.classList.add("lostfill");
        });
        modal.style.display = "flex";
        startGameModal.style.display = "none";
        gameOverModal.style.display = "flex";
        return;
    }

    // logic when the snake eats its food
    if(head.x == food.x && head.y == food.y){
        blocks[`${food.x}-${food.y}`].classList.remove("food");
        food = {x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * cols)};
        blocks[`${food.x}-${food.y}`].classList.add("food");
        snake.unshift(head);
        score += 10;
        scoreElement.innerText = score;
        if (score > highScore){
            highScore = score;
            localStorage.setItem("highScore", highScore.toString());
        }
    }

    snake.forEach(segment=>{
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
    })
    snake.unshift(head);
    snake.pop();

    snake.forEach(segment =>{
        blocks[ `${segment.x}-${segment.y}`].classList.add("fill");
    })
}

// game start 
startButton.addEventListener("click", ()=>{
    modal.style.display = "none";
    IntervalId = setInterval(() => {
        render();
    },300);

    timerIntervalId = setInterval(()=>{
        // destructuring
        let [min, sec] = time.split("-").map(Number);
        if(sec == 59){
            min += 1;
            sec = 0;
        }
        else{
            sec += 1;
        }
        time = `${min}-${sec}`;
        timeElement.innerText = time;
    },1000)
});

// restart game
restartGameButton.addEventListener("click", restartGame);

document.body.addEventListener("keydown", (event) => {
    if(event.key === "ArrowUp"){
        direction = "up";
    }
    else if(event.key  === "ArrowDown"){
        direction = "down";
    }
    else if(event.key === "ArrowLeft"){
        direction = "left";
    }
    else if(event.key === "ArrowRight"){
        direction = "right";
    }
});