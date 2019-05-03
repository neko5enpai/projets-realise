<?php
/*
function nbespace($text) {

    echo substr_count($text," ");

}
nbespace("toto part en bus");
*/

// Compter le nombre d'espace
function spaceCount($string) {
    $spaces = 0;
    for($i = 0; $i < strlen($string); $i++) {
        if ($string[$i]==" ") {
            $spaces++;
        }
    }
    return $spaces;
}

echo spaceCount("Le chocolat c'est bon");

?>

