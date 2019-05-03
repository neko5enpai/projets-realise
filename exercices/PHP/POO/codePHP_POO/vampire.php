<?php

require "Humain.php";

class Vampire extends Humain{
    private $sucerSang;

    public function getSucerSang() {
        return $sucerSang;
    }

    public function setSucerSang($sucerSang){
        $this->sucerSang = $sucerSang;
    }

    public function sauter() {
        echo "Je fais un grand saut.";
    }

    public function attaquer() {
        echo "J'attaque.";
    }

    public function courir() {
        echo "Je pars en courant.";
    }

}


?>