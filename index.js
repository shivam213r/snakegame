let snake = [{ x: 9, y: 10 }];

let board = document.querySelector(".board");

let food = generateFood();

let pregame = document.querySelector(".pre-game")

let instruction = document.querySelector(".instruction")

let direction = 'right';

let gamestarted=false;

let counter = 0;

let highscored = 0

let gameinterval;

let speed = 200

let highscore = document.querySelector("#highscore")

function draw() {
    board.innerHTML = ''
    if(gamestarted){
        drawSnake();
        drawfood();
        
    }
   
}
function drawSnake() {
    snake.forEach((segment) => {
        const snakeElement = makeElement('div', 'snake')
        setPosition(segment, snakeElement);
        board.appendChild(snakeElement)
    })

}

function makeElement(div, className) {
    let element = document.createElement(div);
    element.className = className;
    return element;
}

function setPosition(position, elemented) {
    elemented.style.gridColumn = position.x;
    elemented.style.gridRow = position.y;

}


function drawfood() {
    const foodElement = makeElement('div', 'food')
    setPosition(food, foodElement)
    board.appendChild(foodElement)
}

function generateFood() {
    let x = Math.floor(Math.random() * 20) + 1
    let y = Math.floor(Math.random() * 20) + 1
    let newfood = { x , y }
    snake.forEach(element => {
        if(newfood.x == element.x && newfood.y == element.y){
            console.log("yess")
            generateFood();
        }
    })
    return { x, y }
}

function move() {
    let head = { ...snake[0] }
    switch (direction) {
        case 'right':
            head.x++
            break;

        case 'left':
            head.x--
            break;

        case 'up':
            head.y--
            break;

        case 'down':
            head.y++
            break;

        default:
            break;
    }
    snake.unshift(head);
    if(food.x==head.x && food.y==head.y){
        food=generateFood();
        increase()
        score();
       
        clearInterval(gameinterval)
        gameinterval = setInterval(()=>{
            move();
            collision();
            draw();
        }, speed)
        
    }else{
        snake.pop();
        
    }
}

function startgame(){
    gamestarted = true;
    pregame.style.display = "none"
    gameinterval = setInterval(()=>{
        move();
        collision();
        draw();
    }, speed)
   
}
function handlekey(event){
     if(!gamestarted && event.key==' '){
        counter = 0
    document.querySelector(".currentscore").innerText = counter.toString().padStart(3, '0');
        startgame();
     }
     switch (event.key) {
        case 'ArrowUp':
            direction='up'
            
            break;
            case 'ArrowDown':
                direction='down'
                
                break;

                case 'ArrowLeft':
            direction='left'
            
            break;

            case 'ArrowRight':
            direction='right'
            
            break;
        default:
            break;
     }
}

function increase(){
    if(speed>150){
        speed -= 4;

    }else if(speed > 100 ){
        speed -= 3
    }
    else if (speed > 50) speed -= 2
}
function collision(){
    const head = snake[0]
    if(head.x > 20 || head.x<1 || head.y>20 || head.y<1){
        reset()

    }

    for(let i =1; i<snake.length; i++){
        if(head.x === snake[i].x && head.y === snake[i].y){
            reset()
        }
    }
}

function reset(){
    clearInterval(gameinterval)
    gamestarted = false;
    food =generateFood()
    snake = [{x:9 , y:10}]
    speed = 200
    direction = 'right'
    pregame.style.display = "block"
    instruction.innerText = "uh-Oh try again."
    highscore.style.display="block";
}

function score(){
    counter++
    document.querySelector(".currentscore").innerText = counter.toString().padStart(3, '0');
    if (counter>highscored){
        highscored = counter
        highscore.innerText = highscored.toString().padStart(3, '0');
    }
}
document.addEventListener('keydown',(event)=>{
     handlekey(event)
     
})
 

