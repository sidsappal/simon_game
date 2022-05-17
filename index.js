var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userChosenPattern = [];
var started = false;
var level = 0;
keyStart();
function newSequence() {
  var randomNum = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNum];
  userChosenPattern = [];

  level++;
  $("#level-title").text("Level "+level);
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}
$(".btn").click(function() {
  var userChosenColour = this.id;
  userChosenPattern.push(userChosenColour);

  playSound(userChosenColour);
  $(this).addClass("pressed");
  setTimeout(function() {
    $("#" + userChosenColour).removeClass("pressed");
  }, 100);
  checkAnswer(userChosenPattern.length-1);
});

function playSound(colour) {
  var sound = new Audio("sounds/" + colour + ".mp3");
  sound.play();
}
function keyStart(){
$(document).keydown(function(event) {
  if (!started) {
      newSequence();
      started = true;
    }
});
}
function checkAnswer(currentLevel){

if(userChosenPattern[currentLevel]===gamePattern[currentLevel]){

  if(userChosenPattern.length===gamePattern.length){
    setTimeout(newSequence,1000)
  }
}
else{

  level=0;
  started = false;
  gamePattern = [];
  $("#level-title").text("Game Over, Press Any Key to Restart");
  playSound("wrong")
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  keyStart();
}
}
