<?php

class Maskass {
    private $bras = 2;
    private $pied = 2;
    private $masque = 1;
    private $tenue;
    private $ceinture = 1;
    private $couleurCeinture = "Brun";

    public function marcher() {
        return "Je marche";
    }

    public function chanter($chanson) {
        if($chanson = 1){

            echo "Pouet pouet maskass, mon petit moelleux.";
        }elseif($chanson = 2) {
            echo "Oh nyo, oh nyo, mon petit oignon!";
        }
    }

    public function bisous() {
        return "Pouet";
    }

}

?>