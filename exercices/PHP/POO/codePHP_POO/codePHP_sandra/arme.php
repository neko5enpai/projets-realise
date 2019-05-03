<?php
class Arme{
    private $nbCoups;
    private $puissance;
    
    public function __construct(){
        $this->nbCoups = 0;
        $this->puissance = 2;
    }
    
    public function getNbCoups(){
        return $this->nbCoups;
    }
    public function getPuissance(){
        return $this->puissance;
    }
    public function setPuissance($puissance){
        $this->puissance = $puissance;
    }
    public function utiliser(){
        $this->nbCoups++;
    }
}
?>