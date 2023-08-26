let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

$(document).on('keydown', function(e){
   if(started === false){
    if(e.key === 'Enter'){
        sequenceTrigger();
        
    }
    started = true;
   }
})


$('.btn').on('click', function(){
    let userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);
    animateButton(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
})

function sequenceTrigger(){
    userClickedPattern = [];
    level++
    $('h1').text(`Level ${level}`)

    let randomNum = Math.floor(Math.random() * 4);
    let randomColor = buttonColors[randomNum];
    gamePattern.push(randomColor);
    console.log(gamePattern);
    $(`#${randomColor}`).fadeIn(200).fadeOut(200).fadeIn(200);
}

function animateButton(currentColor){
    $(`#${currentColor}`).addClass('pressed');
    setTimeout(function(){
        $(`#${currentColor}`).removeClass('pressed');
    }, 200)
}

function playSound(sound){
    let audio = new Audio(`./sounds/${sound}.mp3`);
    audio.play()
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(userClickedPattern.length - 1 === gamePattern.length - 1){
            setTimeout(function(){
                sequenceTrigger();
            }, 1000)
        }
    } else{
        playSound('wrong');
        $('body').addClass('game-over');
        setTimeout(function(){
            $('body').removeClass('game-over');
        })
        $('h1').text("Game over, press 'enter' to restart")
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}