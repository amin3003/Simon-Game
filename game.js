var buttonColours=["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var executed = false;    
var level = 0;


$(document).keypress(function () {
   if (!executed) {
      $("#level-title").text("Level " + level);
      nextSequence();
      executed = true;   
   }

});



 $(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    // console.log(userChosenColour);
    userClickedPattern.push(userChosenColour);
   //   console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
 });

function startOver() {
    gamePattern = [];
    executed = false;    
    level = 0;
}


function nextSequence() {
         userClickedPattern = [];
         level++;
         $("#level-title").text("Level " + level);
         var randomNumber = Math.floor(Math.random()*4);
         // console.log(randomNumber);
         var randomChosenColour = buttonColours [randomNumber];
         gamePattern.push(randomChosenColour);
         //  console.log(gamePattern);
         $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
         // console.log(x);
         playSound(randomChosenColour);
 }

function checkAnswer(currentLevel) {
   if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");
      if (userClickedPattern.length === gamePattern.length){
         setTimeout(function () {
         nextSequence();
         },1000)
      }
   }
   else{
      console.log("wrong");
      var audio = new Audio("sounds/wrong.mp3");
      audio.play();
      $("body").addClass("game-over");
      setTimeout(function () {
         $("body").removeClass("game-over");
         },200)
         $("#level-title").text("Game Over, Press Any Key to Restart ");
         startOver();
   }
}


 function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
 }
  



function animatePress(currentColor) {
    $("#"+currentColor).addClass("pressed");

    setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
    }, 100);
}







