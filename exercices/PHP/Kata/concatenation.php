<?php

$maskass = "Moomoo";
$sonPetitfrère = "Toomoo";
$lePlusgros = "Megamoo";

function concatenator($mot1, $mot2, $mot3) {

    return $mot1.$mot2.$mot3;

}

echo concatenator($maskass, $sonPetitfrère, $lePlusgros);

// Autre possibilité

$inputs = fgets(STDIN);
$inputs = explode(" ", $inputs);

$result;
foreach ($inputs as $mot) {
    $result .= $mot;
}

echo $result;


?>

