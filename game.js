
buttonColours = ["red" , "blue" , "green" , "yellow"];

gamePattern = [];

userClickedPattern = [];

var started = false;

var level = 0;

$("body").keypress(function(event){
  if(started==false){
    $("#level-title").text("Level "+level);
    nextSequence();
    started = true;

  }
});

var name;
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(function(){
      $("."+currentColour).removeClass("pressed");
    },100);

}

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  // console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level "+level);
  var randomNumber = Math.random();
  var randomNumber = Math.floor((Math.random()*4));
  console.log(randomNumber);
  var randomChosenColour = buttonColours[randomNumber];
  console.log(randomChosenColour);
  gamePattern.push(randomChosenColour);
  // console.log(gamePattern);
  $("#"+ randomChosenColour).fadeOut(100).fadeIn(100).fadeIn(100);
  playSound(randomChosenColour);

}

function checkAnswer(currentlevel){
  if(userClickedPattern[currentlevel]==gamePattern[currentlevel]){
    // console.log("success");
    if(userClickedPattern.length==gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    wrongAnswer();
    startOver();

  }
}

function wrongAnswer(){

  // console.log("failure");
  // var audio = new Audio("sounds/wrong.mp3");
  // audio.play();
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);
  $("#level-title").text("Game Over, Press Any Key to Restart");

}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
