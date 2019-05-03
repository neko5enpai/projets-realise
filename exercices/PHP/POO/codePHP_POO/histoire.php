<?php

require ("ecolier.php","guerrier.php","vampire.php");
require ("arme.php","sac.php","cartable.php");

    $henri = new Ecolier();
    $vlad = new Vampire();
    $anna = new Guerrier();
    $sac = new Cartable();
    $henri->setSac($sac);
    $henri->marcher();
    $epee = new Epee();
    $anna->setArme($epee);
    $vlad->sauter();
    $anna->getArme()->utiliser();
    $anna->combattre();
    $vlad->courir();

?>