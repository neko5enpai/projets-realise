<?php
$meteo = array("beau", "couvert", "pluvieux");
$today = 1;
foreach($meteo as $m) {
    if($m == $meteo[$today]) {
        echo "Aujourd'hui, le temps est $m";
    }
}

?>