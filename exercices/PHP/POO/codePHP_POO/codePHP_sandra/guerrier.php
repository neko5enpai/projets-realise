<?php
require_once "Humain.php";
class Guerrier extends Humain{
    private $arme;
    
    public function getArme(){
        return $arme;
    }
    
    public function setArme($arme){
            $this->arme = $arme;
    }
    
    public function combattre(){
        echo "Je me bats";
    }
    
    public function courir(){
        echo "Je ne peux pas courir";
    }
}
?>