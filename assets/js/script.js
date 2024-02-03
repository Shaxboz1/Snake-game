const gameBoard = document.getElementById("gameBoard")
const ctx = gameBoard.getContext("2d")
const scoreText = document.getElementById("scoreText")
const resetBtn = document.getElementById("resetBtn")
const pauseBtn = document.getElementById("pauseBtn")
const continueBtn = document.getElementById("continueBtn")
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "white";
const sankeColor = "lightgreen";
const snakeBorder = "black";
const foodColor = "red";
const unitSize = 25;
let running = false;
var pauseRun = true;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let snake = [
    {x:unitSize * 4, y:0},
    {x:unitSize * 3, y:0},
    {x:unitSize * 2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0}
]

window.addEventListener("keydown", changeDirection);
document.addEventListener("DOMContentLoaded", function() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    
    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener("change", function() {
            if (checkbox.checked) {
                checkboxes.forEach(function(otherCheckbox) {
                    if (otherCheckbox !== checkbox) {
                        otherCheckbox.checked = false;
                    }
                });
            }
        });
    });
});
var myVariable = 200;
var checkbox1 = document.querySelector(".chkbx1");
var checkbox2 = document.querySelector(".chkbx2");
var checkbox3 = document.querySelector(".chkbx3");
document.addEventListener("DOMContentLoaded", function() {


    checkbox1.addEventListener("change", updateVariable);
    checkbox2.addEventListener("change", updateVariable);
    checkbox3.addEventListener("change", updateVariable);

    function updateVariable() {
    if (checkbox1.checked) {
        myVariable = 200;
    } else if (checkbox2.checked) {
        myVariable = 120;
    }
      else if (checkbox3.checked) {
        myVariable = 70;
    }
}
});
const startBtn = document.querySelector(".startBtn")
const gameContainer = document.querySelector("#gameContainer")
const overlay = document.querySelector(".overlay")
const startText1 = document.querySelector(".startText1")
const startText2 = document.querySelector(".startText2")
const startText3 = document.querySelector(".startText3")
const startText4 = document.querySelector(".startText4")
const startingPart = document.querySelector(".startingPart")
gameContainer.style.marginTop = "-125px"
function menu(){
    setTimeout(()=>{
        gameStart();
    startText4.style.display = "none"
    gameContainer.style.marginTop = "0" 
    }, 4000)
    setTimeout(()=>{
    startText1.style.display = "none"
    startText2.style.display = "block"
    }, 1000)
    setTimeout(()=>{
    startText2.style.display = "none"
    startText3.style.display = "block"
    }, 2000)
    setTimeout(()=>{
    startText3.style.display = "none"
    startText4.style.display = "block"
    }, 3000)
    startBtn.style.display = "none"
    startingPart.style.display = "none"
    checkbox1.style.display = "none"
    checkbox2.style.display = "none"
    checkbox3.style.display = "none"
    overlay.style.display = "none"
    startText1.style.display = "block"
    startText2.style.display = "none"
    startText3.style.display = "none"
    startText4.style.display = "none"
}
function gameStart(){
    running = true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick();
};
pauseBtn.addEventListener("click", ()=>{
    pauseRun = false;
    pauseBtn.style.display = "none"
    continueBtn.style.display = "block"
})
continueBtn.addEventListener("click", ()=>{
    continueBtn.style.display = "none"
    pauseBtn.style.display = "block"
    pauseRun = true;
    nextTick();
})
function nextTick(){
    if(running == true && pauseRun == true){
        setTimeout(()=>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, myVariable);
    }else if(pauseRun == false){
        displayPauseGame();
    }
    else{
        dsiplayGameOver();
    }
};
function clearBoard(){
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
};
function createFood(){
    function randomFood(min, max){
        const randNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return randNum;
    }
    foodX = randomFood(0, gameWidth - unitSize)
    foodY = randomFood(0, gameWidth - unitSize)
};
function drawFood(){
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize)
};
function moveSnake(){
    const head = {x: snake[0].x + xVelocity,
                  y: snake[0].y + yVelocity}
    snake.unshift(head);
    if(snake[0].x == foodX && snake[0].y == foodY){
        score+=1;
        scoreText.textContent = score;
        createFood();

    }else{
        snake.pop();
    }
};
function drawSnake(){
    ctx.fillStyle = sankeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(snakePart =>{
        ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    })
};
function changeDirection(event){
    const keyPressed = event.keyCode
    const LEFT = 37;
    const kLEFT = 65;
    const UP = 38;
    const kUP = 87;
    const RIGHT = 39;
    const kRIGHT = 68;
    const DOWN = 40;
    const kDOWN = 83;
    
    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);

    switch(true){
        case(keyPressed == LEFT  && !goingRight):
          xVelocity = -unitSize;
          yVelocity =  0;
          break;

        case(keyPressed == kLEFT  && !goingRight):
          xVelocity = -unitSize;
          yVelocity =  0;
          break;
        
        case(keyPressed == UP &&  !goingDown):
          xVelocity = 0;
          yVelocity =  -unitSize;
          break;
        case(keyPressed == kUP &&  !goingDown):
          xVelocity = 0;
          yVelocity =  -unitSize;
          break;
        
        case(keyPressed == RIGHT && !goingLeft):
          xVelocity = unitSize;
          yVelocity =  0;
          break;
        case(keyPressed == kRIGHT && !goingLeft):
          xVelocity = unitSize;
          yVelocity =  0;
          break;
        
        case(keyPressed == DOWN && !goingUp):
          xVelocity = 0;
          yVelocity = unitSize;
          break;
        case(keyPressed == kDOWN && !goingUp):
          xVelocity = 0;
          yVelocity = unitSize;
          break;
       
    }

};
function checkGameOver(){
    switch(true){
        case(snake[0].x < 0):
            running = false;
            break;
        case(snake[0].x >= gameWidth):
            running = false;
            break;
        case(snake[0].y < 0):
            running = false;
            break;
        case(snake[0].y >= gameHeight):
            running = false;
            break;       
    }
    for(let i = 1; i < snake.length; i+=1){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            running = false;
        }
    }
};
function displayPauseGame(){
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Game Paused!", gameWidth / 2, gameHeight / 2);
}
function dsiplayGameOver(){
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Game Over!", gameWidth / 2, gameHeight / 2);
    running = false;
    
    resetBtn.style.display = "block"
    pauseBtn.style.display = "none"
};
resetBtn.addEventListener("click", ()=>{
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        {x:unitSize * 4, y:0},
        {x:unitSize * 3, y:0},
        {x:unitSize * 2, y:0},
        {x:unitSize, y:0},
        {x:0, y:0}
    ];
    running = true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick();
    resetBtn.style.display = "none"
    pauseBtn.style.display = "block"
});
const settingBtn = document.querySelector(".settingsBtn")
const checkboxs = document.querySelector(".chekboxs")
const setting = document.querySelector(".bx-cog")
function showSettings(){
    checkboxs.classList.toggle("active")
    startingPart.classList.toggle("active1")
    setting.classList.toggle("active2")
}
function move(direction){
    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);
    switch(true){
        case(direction == 1 && !goingDown):
        xVelocity = 0;
        yVelocity =  -unitSize;
        break;
        case(direction == 2 && !goingUp):
        xVelocity = 0;
        yVelocity = unitSize;
        break;
        case(direction == 3 && !goingRight):
        xVelocity = -unitSize;
        yVelocity =  0;
        break;
        case(direction == 4 && !goingLeft):
        xVelocity = unitSize;
        yVelocity =  0;
        break;
    }
}
