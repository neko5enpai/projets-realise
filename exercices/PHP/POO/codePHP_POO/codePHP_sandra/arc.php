<?php
require_once "Arme.php";
class Arc extends Arme{
    private $nbFleches;
    
    public function __construct(){
        parent::__construct();
        $this->nbFleches = 10;
    }
    
    public function getNbFleches(){
        return $this->nbFleches;
    }
    public function ajouterFleches($nbFleches){
        $this->nbFleches += $nbFleches;
    }
}
?>