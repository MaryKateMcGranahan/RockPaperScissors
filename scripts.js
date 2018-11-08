
var player_name= localStorage.getItem("player_name");
var player_move=localStorage.getItem("player_move")
var opponentThrow;
var winner;
var games_played;
var games_lost;
var games_won;
var playerRockThrow;
var playerPaperThrow;
var playerScissorsThrow;
var opponentRockThrow;
var opponentScissorsThrow;
var opponentPaperThrow;
var pRockThrows;
var pPaperThrows;
var pScissorsThrows;


makeToggable(document.getElementById("show_rules_button"), document.getElementById("rules"));
makeToggable(document.getElementById("show_stats_button"), document.getElementById("stats"));

document.getElementById("enter_name_button").addEventListener("click",function(){
  var p_name=document.getElementById("player_name_input").value;
  if(!p_name){
    alert("No name entered!");
  }
  else{
  localStorage.setItem("player_name",p_name);
  alert("Name successfully submitted, get ready to play!");
  console.log(p_name);
  updateNames(p_name);
  showOrNot(document.getElementById("player_name_input"), false);
  showOrNot(document.getElementById("throw_choice"),true)
  }
})

document.getElementById("throw_choice_button").addEventListener("click",function(){
  var p_move=document.getElementById("throw_choice_select").value;
  if(p_move=="blank"){
    alert("No throw chosen!");
  }
  else{
  games_played=games_played+1;
 localStorage.setItem("player_move",p_move);
 document.getElementById("player_throw_span").innerHTML=p_move;
 var num=Math.floor(Math.random() * 3);
 if(num==0){
   opponentThrow="rock";
   opponentRockThrow=opponentRockThrow+1;
   showOrNot(document.getElementById("BrowserRockImg"),true);
   showOrNot(document.getElementById("BrowserPaperImg"),false);
   showOrNot(document.getElementById("BrowserScissorsImg"),false);
 }
 else if(num==1){
   opponentThrow="paper";
   opponentPaperThrow=opponentPaperThrow+1;
   showOrNot(document.getElementById("BrowserRockImg"),false);
   showOrNot(document.getElementById("BrowserPaperImg"),true);
   showOrNot(document.getElementById("BrowserScissorsImg"),false);
 }
 else if (num==2){
   opponentThrow="scissors";
   opponentScissorsThrow=opponentScissorsThrow+1;
   showOrNot(document.getElementById("BrowserRockImg"),false);
   showOrNot(document.getElementById("BrowserPaperImg"),false);
   showOrNot(document.getElementById("BrowserScissorsImg"),true);
 }
localStorage.setItem("opponent_move",opponentThrow);
document.getElementById("opponent_throw_span").innerHTML=opponentThrow;
calculateResults(p_move,opponentThrow);
calculateBrowserStats(opponentPaperThrow,opponentRockThrow,opponentScissorsThrow);
}
})



if(!player_name){
  showOrNot(document.getElementById("enter_name"), true);
}
else{
  updateNames(player_name);
  showOrNot(document.getElementById("throw_choice"),true);
}

function calculateResults(playerMove,opponentMove){
  showOrNot(document.getElementById("game_results"),true)
  if((playerMove=="rock"&&opponentMove=="rock")||(playerMove=="paper"&&opponentMove=="paper")||(playerMove=="scissors"&&opponentMove=="scissors")){
    winner="tie";
  }
  else if((playerMove=="rock"&&opponentMove=="scissors")||(playerMove=="scissors"&&opponentMove=="paper")||(playerMove=="paper"&&opponentMove=="rock")){
    winner=player_name;
    games_won+=1;
  }
  else if((playerMove=="rock"&&opponentMove=="paper")||(playerMove=="scissors"&&opponentMove=="rock")||(playerMove=="paper"&&opponentMove=="scissors")){
    winner="B(r)owser";
    games_lost+=1;
  }
  if(playerMove=="rock"){
    pRockThrows+=1;
    showOrNot(document.getElementById("playerRockImg"),true);
    showOrNot(document.getElementById("playerPaperImg"),false);
    showOrNot(document.getElementById("playerScissorsImg"),false);
  }
  else if(playerMove=="paper"){
    pPaperThrows+=1;
    showOrNot(document.getElementById("playerRockImg"),false);
    showOrNot(document.getElementById("playerPaperImg"),true);
    showOrNot(document.getElementById("playerScissorsImg"),false);
  }
  else if(playerMove=="scissors"){
    pScissorsThrows+=1;
    showOrNot(document.getElementById("playerRockImg"),false);
    showOrNot(document.getElementById("playerPaperImg"),false);
    showOrNot(document.getElementById("playerScissorsImg"),true);
  }
  localStorage.setItem("games_played",games_played);
  localStorage.setItem("games_won",games_won);
  localStorage.setItem("games_lost",games_lost);
document.getElementById("results_span").innerHTML=winner;
 calculatePlayerStats(pRockThrows,pPaperThrows,pScissorsThrows);
calculateStats(games_lost,games_won,games_played);
}

function calculateStats(gamesL,gamesW,gamesP){
document.getElementById("games_played_span").innerHTML=gamesP;
document.getElementById("games_won_span").innerHTML=gamesW;
document.getElementById("win_loss_span").innerHTML=gamesW+":"+gamesL;
}

function calculateBrowserStats(rock,paper,scissors){
  var total=rock+paper+scissors;
  var rockStat=(rock/total)*100;
  var paperStat=(paper/total)*100;
  var scissorsStat=(scissors/total)*100;
  document.getElementById("opponent_stats_span").innerHTML="Paper:"+paperStat+"% Scissors:"+scissorsStat+"% Rock:"+rockStat+"%";

}

function calculatePlayerStats(rock,paper,scissors){
  var total=rock+paper+scissors;
  var rockStat=(rock/total)*100;
  var paperStat=(paper/total)*100;
  var scissorsStat=(scissors/total)*100;
  document.getElementById("player_stats_span").innerHTML="Paper:"+paperStat+"% Scissors:"+scissorsStat+"% Rock:"+rockStat+"%";

}

document.getElementById("play_again_button").addEventListener("click",function(){
  document.getElementById("throw_choice_select").value="blank";
showOrNot(document.getElementById("game_results"),false);
})

function updateNames(name){
  var name_spots=document.getElementsByClassName("player_name_span");
  for (var i=0; i<name_spots.length; i++){
    console.log(name_spots);
    name_spots[i].innerHTML=name;
  }
  games_played=0;
  games_lost=0;
  games_won=0;
  playerRockThrow=0;
  playerPaperThrow=0;
  playerScissorsThrow=0;
  opponentRockThrow=0;
  opponentScissorsThrow=0;
  opponentPaperThrow=0;
  pRockThrows=0;
  pPaperThrows=0;
  pScissorsThrows=0;
}

function showOrNot(div_element, show){
  console.log(div_element.classList);

  if(show && div_element.classList.contains("hidden")){
    div_element.classList.remove("hidden");
    div_element.classList.add("visible");
  }else if(!show&&div_element.classList.contains("visible")){
    div_element.classList.remove("visible");
    div_element.classList.add("hidden");
  }
}

function makeToggable(button_id, button_element){
  button_id.addEventListener("click", function(){
    if(button_element.classList.contains("hidden")){
      button_element.classList.remove("hidden");
      button_element.classList.add("visible");
    }else{
      button_element.classList.remove("visible");
      button_element.classList.add("hidden");
    }
  })
}
