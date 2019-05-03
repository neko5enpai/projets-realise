<?php
class Fleur{

    private $nbrPetales = 0;
    private $couleur = "blanche";
    private $coupee = false;

    public function __construct($nbrPetales, $couleur) {
        $this->nbrPetales = $nbrPetales;
        $this->couleur = $couleur;
    }

    public function ceuillir() {
        if($this->coupee == true) {
            echo "Cette fleur est déjà coupée<br/>";
        }else{
            $this->coupee = true;
        }
    }
}
$marguerite = new Fleur(10, "blanche");
$pissenlit = new Fleur(20, "jaune");

?>