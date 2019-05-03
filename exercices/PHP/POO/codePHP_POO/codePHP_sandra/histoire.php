<?php
require "Guerrier.php";
require "Epee.php";
require "Ecolier.php";

// Histoire
$henri = new Ecolier();
$vlad = new Vampire();
$anna = new Guerrier();

//Henri mis son cartable
$henri->setSac(new Cartable());
// Anna et son épée magique
$anna->setArme(new Epee());

// Vlad fait un grand saut
$vlad->sauter();
// Anna met un coups d'epee
$anna->getArme()->utiliser();
// Vlad fuit en courant
$vlad->courir();

?>