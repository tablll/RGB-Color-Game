var game = true;
var numSquares = 6;
var colors = [];
var pickedColor;
var score = 0;
var scoreToWin = 10;
var clicks = 0;
var clicksToLoose = 15;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector('#colorDisplay');
var message = document.querySelector('#message');
var resetButton = document.querySelector('#reset');
var modeBtn = document.querySelectorAll('.mode');
var h1 = document.querySelector('h1');
var scoreDisplay = document.querySelector('#score');
var clicksDisplay = document.querySelector('#clicksDisplay');
var clicksToLooseDisplay = document.querySelector('#clicksToLooseDisplay');

init ()

function init () {
    setupModeButtons ();
    setupSquares ();
    reset();
}

function setupModeButtons () {
    //listen 3 buttons to change mode
    for (i=0; i < modeBtn.length; i++) {
        modeBtn[i].addEventListener('click', function(){ 
            modeBtn[0].classList.remove('selected');
            modeBtn[1].classList.remove('selected');
            modeBtn[2].classList.remove('selected');
            this.classList.add('selected');
            if (this.textContent === "EASY") {
                numSquares = 3;
                clicksToLoose = 20;
                clicksToLooseDisplay.textContent = clicksToLoose;
            }
            else if (this.textContent === "HARD") {
                numSquares = 6;
                clicksToLoose = 15;
                clicksToLooseDisplay.textContent = clicksToLoose;
            }
            else {
                numSquares = 9;
                clicksToLoose = 10;
                clicksToLooseDisplay.textContent = clicksToLoose;
            }
            reset();
        });
    }  
}

function setupSquares () {
        // checkin for clicked squares
        for (i=0; i < squares.length; i++) {
        // click listeners
            squares[i].addEventListener("click", function(){ 
            //берем цвет нажатого квадрата
            var clickedSquare = this.style.backgroundColor;
            // сравниваем с выбраным
            if (clickedSquare === pickedColor && game == true) {
                changeColors (pickedColor);
                score = score + 1;
                scoreDisplay.textContent = score;
                clicksDisplay.textContent = clicks;
                game = false;
                    if (score === scoreToWin) {
                        message.textContent = "You Win!";
                        resetButton.textContent = "Wanna play again?";
                    }
                    else {
                        message.textContent = "Correct!";
                        resetButton.textContent = "Next Round";
                        }
            }    
            else if (game == true) {
                this.style.backgroundColor = "#132323";
                clicks = clicks + 1;
                clicksDisplay.textContent = clicks;
                    if (clicks === clicksToLoose) {
                        message.textContent = "You Loose!";
                        resetButton.textContent = "Wanna try again?";
                        game = false;
                    } else { 
                message.textContent = "Wrong!";}
            }
            }); 
        } 
}

function reset () {
    // we need to generate new colors
    colors = generateRandomColors(numSquares);
    // pick new color for game mach and dispaly it
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    // change squares with new colors
    for (i=0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }

    resetButton.textContent = "NEW COLORS";
    h1.style.backgroundColor = "darkseagreen";
    message.textContent = " ";  
    game = true;
    if (score === scoreToWin || clicks === clicksToLoose) {
        score = 0;
        clicks = 0;
        scoreDisplay.textContent = score;
        clicksDisplay.textContent = clicks;
    }
    };
}

resetButton.addEventListener('click', function(){
    reset ()
    });

function changeColors (color) {
    for (i=0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    } 
    h1.style.backgroundColor = color;
}

function pickColor () {
    var random = Math.floor(Math.random() * colors.length);
    return colors [random];
    
} 

function generateRandomColors(num) {
    // make array
    var arr = [];
    // make loopp to repeat NUM times
    for (i = 0; i < num; i++) {
        // get random color
        arr.push(randomColor());
        
    }
    // return array
    return arr;
}

function randomColor() {
    // we need pick random number from 0 to 255 to every color
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}