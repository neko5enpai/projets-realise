<?php

class Personne {
    private $nom;
    private $prenom;
    private $age;

    public function __construct($nom, $prenom, $age) {
        $this->nom = $nom;
        $this->prenom = $prenom;
        $this->age = $age;
    }

    function getNom() {
        return $this->nom;
    }

    function getPrenom() {
        return $this->prenom;
    }

    function getAge() {
        return $this->age;
    }

    function setAge($age) {
        if ($age > $this->age) {
            $this->age = $age;
        }
    }

    function bisous() {
        echo "<br> Mouah.";
    }
}
$moomoo = new Personne('Moelleux', 'Moomoo', 4);
    $moomoo->setAge(4);
        echo $moomoo->getPrenom();
        echo " est son prénom. <br>";
        echo $moomoo->getNom();
        echo " est son nom. <br>";
        echo "Il est âgé de ";
        echo $moomoo->getAge();
        echo " ans. <br>";
        echo "C'est un gentil maskass moelleux.";

$moomoo->bisous();

?>