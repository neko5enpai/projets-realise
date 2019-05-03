function espace(mot){ // Fonction
  var res=0; // 0 = initialiser le résultat
  for(var counter=0; counter<mot.length; counter++){
    // definition de la boucle = initialisation du compter;compteur inférieur à longueur du mot; compteur = +1
    if (mot[counter]===" "){ // Condition = Si le mot dans le compter est égal à un espace, résultat = +1
      res++;
    }
    }
  return res; // Stoppe la fonction et rend le résultat
}

console.log(espace("La vache mange de l'herbe.")); // Affichage dans la console