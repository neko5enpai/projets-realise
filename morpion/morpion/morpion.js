var jouers = [];
var symbol = ["O","X"];
var quiTourne = 0;
jouers[0] = "Pseudo1";
jouers[1] = "Pseudo2";

/*alert (jouers[quiTourne]);..> */


function play(clickedDiv){
    
    clickedDiv.innerHTML = "<span>" + symbol[quiTourne] + "</span> ";
    toggl()
}

function toggl() {
    if (quiTourne == 0) quiTourne = 1;
        else
            quiTourne = 0;
    
document.getElementsById("joueur-tour").innerText = jouers[quiTourne] + "Tourne....!";
}