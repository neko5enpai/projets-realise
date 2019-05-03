<?php

require "Humain.php";

class Ecolier extends Humain{
    private $sacaDos;

    public function getSacaDos() {
        return $sacaDos;
    }

    public function setSacaDos($sacaDos){
        $this->sacaDos = $sacaDos;
    }
}


?>