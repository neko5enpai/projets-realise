<?php

class Voiture {
    private $vitesse;
    private $vitesseMax;
    private $klaxon;
    private $climActive;
    private $couleur;

    public function __construct($vitesseMax, $klaxon, $couleur) {
        $this->vitesseMax = $vitesseMax;       
        $this->klaxon = $klaxon;
        $this->couleur = $couleur;
        $this->climActive = false;
        $this->vitesse = 0;
    }

    function klaxonner() {
        echo "<em>" . $this->klaxon . "</em><br>";
    }

    function getVitesseMax() {
        return $this->vitesseMax; 
    }

    function getVitesse() {
        return $this->vitesse;
    }

    function setVitesse($vitesse) {
        if ($vitesse < $this->vitesseMax) {
            $this->vitesse = $vitesse;
        } else {
            $this->vitesse = $this->vitesseMax;
        }
    }
}

$voitureJoris = new Voiture(180, "onk onk","bleue");
$voitureVincent = new Voiture(160, "tut tuut","rouge");
$voiturePietro = new Voiture(210, "Onk ooooooNkkKK","gris taupe astigmate");

$voitureJoris->klaxonner();
$voiturePietro->klaxonner();

$voitureVincent->setVitesse(34000);
echo $voitureVincent->getVitesse() . '<br>';

?>