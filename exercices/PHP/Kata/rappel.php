<?php

$age = 67;

if ($age > 65){
    echo "Profite de la retraite! n_n <br>";
    echo "Tu es majeur";
} elseif ($age > 18){
    echo "tu es mineur ";
}elseif ($age > 0) {
        echo "Tu n'es pas né(e) ";
} else {
    echo "tu es mineur";
}



?>