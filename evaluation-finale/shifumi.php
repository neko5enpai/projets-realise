<?php
class Shifumi {
    private $base = array("Feuille", "Caillou", "Ciseaux");
    private $result = array(array(0, 2, 1),
                            array(1, 0, 2),
                            array(2, 1, 0));
    
    private $playerOne;
    private $playerTwo;

    public function playPlayerOne($secretNumber) {
        $this->playerOne = $secretNumber;
    }

    public function playPlayerTwo($secretNumber) {
        $this->playerTwo = $secretNumber;
    }

    public function score() {
        echo "Le joueur 1 a choisi " .
            $this->base[$this->playerOne] . "<br/>";
        echo "Le joueur 2 a choisi " .
            $this->base[$this->playerTwo] . "<br/>";

        $winner =
            $this->result[$this->playerTwo] [$this->playerOne];
        
        if($winner == 0) {
            echo "match nul";
        }else{
            echo "Le joueur $winner a gagné";
        }
    }
}

$jeu = new Shifumi();
$jeu->playPlayerOne(2);
$jeu->playPlayerTwo(1);
$jeu->score();
?>