var jouers = [];
var symbol = ["X","O"];
var quiTourne = 0;
var scores = [0,0];
partie = "";
jouers[0] = "";
jouers[1] = "";
var winValues = [7,56,73,84,146,273,292,448];
var gameOver = false;

function clickHome(){
 //   partie = document.getElementById("insert-game").value;
 //   jouers[0] = document.getElementById("player-entry1").value;
  //  jouers[1] = document.getElementById("player-entry2").value;
 //  localStorage.setItem("partie",partie);
//    localStorage.setItem("jouers1",jouers[0]);
 //   localStorage.setItem("jouers2",jouers[1]);
    window.location.href = "nouvelle-partie.html";  
  }


/*qui gagner  */
function winChech(){
    
    for (var i = 0; i < winValues.length; i++){
     if (  scores[quiTourne] == winValues[i]){
      
      gameOver = true; 
      nouvelle-partie
      alert (jouers[quiTourne] +  "..... A GAGNE.....!"); 
      window.location.href = "resultats.html";      
         }  
        
  }
}

/* points  */
function pointCount(userPoints){
    
    scores[quiTourne] += userPoints;
}


function play(clickedDiv, DivPoints){
    if (!gameOver){
        
     
    if (clickedDiv.innerHTML == "&nbsp;"){
        pointCount(DivPoints);
        clickedDiv.innerHTML = "<span>" + symbol[quiTourne] + "</span> ";
        winChech();
        toggl();   
    }
     
   }  
}

function toggl() {
    if (quiTourne == 0) quiTourne = 1;
  else  quiTourne = 0;
  
document.getElementById("tour").innerText = jouers[quiTourne] + "     Tourne....!";
}




