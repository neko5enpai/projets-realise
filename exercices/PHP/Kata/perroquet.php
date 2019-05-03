<?php

function perroquet($parle, $heure) {

    if ($parle && (($heure >= 22) || ($heure<=7))) {
        echo "Le perroquet me perturbe! ";
    }else{
        echo "Tout va bien! ";
    }

}

perroquet(TRUE, 22);
perroquet(TRUE, 6);
perroquet(FALSE, 23);
perroquet(TRUE, 9);


/******************************************************

    WHEOH ! '.' WHEOH ! '.' WHEOH ? '.' WHEOH ! '.'

*******************************************************/

/* $ok = false;
while(!$ok) {

    $inputs = fgets(STDIN); // Sur notre entrée on veut passer l'heure suivit du booleén parle ex: 7 true
    $inputs = explode(" ", $inputs);

    $heure = $inputs[0];
    $parle = $inputs[1];

    $ok = true;

    if($heure < 0 || $heure > 23) {
        // L'entrée est fausse
        echo "$heure n'est pas une entrée valide (0-23)";
        $ok = false;
    }
    if($parle != true && $parle != false){
        echo "$parle n'est pas une entrée valide (true/false)";
        $ok = false;
    }
}
*/

?>