function perroquet(parle, heure){ // Fonction
  if (parle && ((22<=heure && heure<24) || (0<=heure && heure<=7))) { //teste si le perroquet parle (booléen parle) et si l'heure est comprise entre 22 et 23h59 ou si elle est comprise entre 0 et 7h
    console.log("Le perroquet nous perturbe!");
  } 
  else{
    console.log("Tout va bien!!!");
  }
}

perroquet(true,23); // Lance la fonction
perroquet(true,7);
perroquet(true,22);
perroquet(true,13);