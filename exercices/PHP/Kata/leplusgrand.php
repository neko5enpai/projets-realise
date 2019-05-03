
<?php

function lePlusgrandnombre($nb1,$nb2) {
    
    echo "Les 2 nombres choisis sont : premier nombre = ".$nb1." deuxième nombre = ".$nb2."<br>";

    if ( $nb1 > $nb2) {
        echo "le plus grand des deux est ".$nb1;
    } else {
        echo "le plus grand des deux est ".$nb2;
    }
}

$nbrrand1=rand(1,50);
$nbrrand2=rand(1,50);


lePlusgrandnombre($nbrrand1,$nbrrand2);


?>