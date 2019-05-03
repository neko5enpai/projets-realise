<?php
require "Guerrier.php";
require "Arc.php";

$jack = new Guerrier();
$arcDeJack = new Arc();

$jack->setArme($arcDeJack);

$jack->sauter();
echo "<br>";
$jack->courir();
echo "<br>";
$jack->combattre();
echo "<br>";
$jack->getArme()->utiliser();

echo "Nb coups de l'arme = ".$jack->getArme()->getNbCoups();

?>