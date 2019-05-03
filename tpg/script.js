let xhttp = new XMLHttpRequest(); // on crée un nouvel objet

xhttp.onreadystatechange = function () { // On attache le callback
    // On vérifie que c’est OK
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {    

        let data = JSON.parse(this.responseText);
        console.log(data.stops[0].stopCode);
        console.log(data.stops[1].stopCode);

        let xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {

                let data = JSON.parse(this.responseText);
                // TODO: Utiliser les données

                console.log(data);
            }
        }
        xhttp.open("GET", "http://api.tpg.ofcompute.rs/GetNextDepartures.json?key=b12cd3a0-0aa7-11e6-964d-0002a5d5c51b&stopCode="+data.stops[0].stopCode);
        xhttp.send();
    }
};





/* 
JSON.stringify() */

// On indique la méthode et la ressource
xhttp.open("GET", "http://api.tpg.ofcompute.rs/GetStops.json?key=b12cd3a0-0aa7-11e6-964d-0002a5d5c51b&stopName=corn");
xhttp.send(); // On lance la requête
