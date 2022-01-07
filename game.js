const buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern =[];
var userClickedPattern =[];
let level = 0;
let isGameRunning = false;

const audioRed = new Audio("sounds/red.mp3");
const audioBlue = new Audio("sounds/blue.mp3");
const audioGreen = new Audio("sounds/green.mp3");
const audioYellow = new Audio("sounds/yellow.mp3");
const audioWrong = new Audio("sounds/wrong.mp3");

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $(`#${currentColor}`).addClass("pressed").fadeOut();
    setTimeout(function () {
        $(`#${currentColor}`).removeClass("pressed").fadeIn();
    }, 100);
}

function checkAnswer() {
    let pass = true;
    pass = level === userClickedPattern.length ? true : false;
    for (var i =0;i<level;i++ ) {
        if (userClickedPattern[i] != gamePattern[i]) pass = false;
    }
    if (pass === true) {
        setTimeout(function () {
            nextSequence();
        }, 2000);
        
    }   
    else if (level === userClickedPattern.length) {
        playSound("wrong");
        $("body").addClass("game-over").fadeOut();
        setTimeout(function () {
            $("body").removeClass("game-over").fadeIn();
        }, 200);
        $("#level-title").text("Game Over!!! Press any key to replay");
        level = 0;
        userClickedPattern = [];
        gamePattern = [];
        isGameRunning = false;
    }
}

function updateHeading() {
    $("#level-title").text(`Level ${level}`);
}

function nextSequence() {
    var randomNumber = Math.random() * 4;
    randomNumber = Math.floor(randomNumber);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    console.log("Game Pattern: ");
    console.log(gamePattern); 
    playSound(randomChosenColor);
    animatePress(randomChosenColor);
    level ++;
    updateHeading();
    userClickedPattern = [];
}

$(".btn").click((event)=> {
    var userChosenColor = String($(event.target).attr("id"));
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor)
    animatePress(userChosenColor);
    console.log("User Pattern: ");
    console.log(userClickedPattern);
    checkAnswer();
});

$(document).keypress((event) => {
    console.log("Key Pressed");
    if (isGameRunning === false) {
        nextSequence();
        console.log("Game Started");
        isGameRunning = true;
    }
});
