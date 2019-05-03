/*
    __  ___                 _           
   /  |/  /___  _________  (_)___  ____ 
  / /|_/ / __ \/ ___/ __ \/ / __ \/ __ \
 / /  / / /_/ / /  / /_/ / / /_/ / / / /
/_/  /_/\____/_/  / .___/_/\____/_/ /_/ 
                 /_/                    

Project by Mohamad & Virginie */
/* November 2018 */
/* Version : 1.0 */

var joueurs = [];
var symbol = ["X","O"];
var aQuiletour = 0;
var scores = [0,0];
var partie = "";
joueurs[0] = "";
joueurs[1] = "";
var winValues = [7,56,73,84,146,273,292,448];
var gameOver = false;



function updat(){

     
    var j1 = localStorage.getItem("player-entry1");
    var j2 = localStorage.getItem("player-entry2");
    joueurs[0] = j1;
    joueurs[1] = j2;


   // document.getElementById("game-title").innerHTML = npartie;
  //  document.getElementById("joueur1").innerHTML = j1;
  //  document.getElementById("joueur2").innerHTML = j2;


}

updat();


function clickHome(){

 //   partie = document.getElementById("insert-game").value;
 //   document.getElementById("game-title").value = partie;
// document.getElementById("game-title").value = document.getElementById("insert-game").value;
 //   joueurs[0] = document.getElementById("player-entry1").value;
  //  joueurs[1] = document.getElementById("player-entry2").value;
 //  localStorage.setItem("partie",partie);
//    localStorage.setItem("joueurs1",joueurs[0]);
 //   localStorage.setItem("joueurs2",joueurs[1]);
 //   window.location.href = "nouvelle-partie.html";  
  }


/* qui a gagné  */
function winChech(){
    
    for (var i = 0; i < winValues.length; i++){
     if (  scores[aQuiletour] == winValues[i]){
      
      gameOver = true; 
      
      alert (joueurs[aQuiletour] +  "..... A GAGNE.....!");
       
      //document.getElementById("winner").innerText = joueurs[aQuiletour];
       window.location.href = "resultats.html";      
         }  
        
  }
}

/* points  */
function pointCount(userPoints){
    
    scores[aQuiletour] += userPoints;
}


function play(clickedDiv, DivPoints){
    if (!gameOver){
        
     
    if (clickedDiv.innerHTML == "&nbsp;"){
        pointCount(DivPoints);
        clickedDiv.innerHTML = "<span>" + symbol[aQuiletour] + "</span> ";
        winChech();
        toggl(); 
        updat();
    }
     
   }  
}

function toggl() {

    if (aQuiletour == 0) aQuiletour = 1;
  else  aQuiletour = 0;
  
document.getElementById("tour").innerText = joueurs[aQuiletour] + "     Tourne....!";
}