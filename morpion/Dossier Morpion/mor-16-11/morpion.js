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
partie = "";
joueurs[0] = "Mohamad";
joueurs[1] = "Virginie";
var winValues = [7,56,73,84,146,273,292,448];
var gameOver = false;

/*qui gagner  */
function winChech(){
    
    for (var i = 0; i < winValues.length; i++){
     if (  scores[aquiletour] == winValues[i]){
      
      gameOver = true;     
      alert (joueurs[aQuiletour] +  "..... A GAGNE.....!"); 
           
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
    }
     
   }  
}

function toggl() {
    if (aQuiletour == 0) aQuiletour = 1;
  else  aQuiletour = 0;
  
document.getElementById("tour").innerText = joueurs[aQuiletour] + "     Tourne....!";
}




