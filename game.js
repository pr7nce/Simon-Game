var buttonColors= ["red", "blue", "green", "yellow"];
var gamePattern=[];
var clicked =[];
var star=false;
var level=0;
$(document).keypress(function(){
  if(!star){
    $("#level-title").text("Level "+ level);
    nextSequence();
    star=true;
  }
});
$(".btn").click(function(){
  var chosen=$(this).attr("id");
  clicked.push(chosen);
  playSound(chosen);
  animatePress(chosen);
  checkAnswer(clicked.length-1);
});
function checkAnswer(currentLevel){
  if(clicked[currentLevel]===gamePattern[currentLevel]){
    console.log("success");
    if(clicked.length===gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }
  else{
    console.log("false");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Restart");
    startOver();
  }
};
function nextSequence(){
  clicked=[];
  level++;
  $("#level-title").text("Level "+ level);
  var randomNumber= Math.floor(Math.random()*4);
  var randomChosenColor= buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  playSound(randomChosenColor);
};
function playSound(name){
  $("#" + name).fadeOut(100).fadeIn(100);
  var ply=new Audio("sounds/"+name+".mp3");
  ply.play();
};
function animatePress(currentColor){
  $("." + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
};
function startOver(){
  clicked=[];
  gamePattern=[];
  star=false;
  level=0;
};
