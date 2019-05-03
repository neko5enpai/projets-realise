<?php
class Connexion{
    private $connexion;
    public function __construct() {

    }

    public function createCustomer($nom, $adresse, $telephone) {
        $stmt = $this->connexion->prepare(
            'INSERT INTO Customers ("nom", "adresse", "telephone")
            VALUES (:nom, :adresse, :telephone)'
        );
        $stmt->execute(array(
            "nom" => $snom,
            "adresse" => $adresse,
            "telephone" => $telephone
        ));
    }
}

?>