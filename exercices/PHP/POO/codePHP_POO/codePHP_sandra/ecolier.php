<?php
require_once "Humain.php";
class Ecolier extends Humain{
    
    private $sac;
    
    public function getSac(){
        return $this->sac;
    }
    
    public function setSac($sac){
        $this->sac = $sac;
    }
}
?>