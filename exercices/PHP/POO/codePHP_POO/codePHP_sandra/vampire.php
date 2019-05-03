<?php
require_once "Humain.php";
class Vampire extends Humain{
    
    public function voler(){
        echo "Je vole";
    }
    
    public function manger(){
        echo "Je mange";
    }
    
    public function sauter(){
        echo "Je fais un grand saut";
    }
}
?>