<?php

include ('contrat.php');

class Connexion {
    private $connexion;

    public function __construct() {
        $PARAM_hote='localhost';
        $PARAM_port='3306';
        $PARAM_nom_bd='Babysitter';
        $PARAM_utilisateur='adminBaby';
        $PARAM_mot_passe='B@bysitt3r';

        try{
            $this->connexion = new PDO(
                'mysql:host='.$PARAM_hote.';dbname='.$PARAM_nom_bd,
                $PARAM_utilisateur,
                $PARAM_mot_passe);
        }
        catch(Exception $e) {
            echo 'Erreur : '.$e->getMessage().'<br/>';
            echo 'N° : '.$e->getCode();
        }
    }

    public function getContrat($id) {
        $requete_prepare = $this->connexion->prepare(
            "SELECT b.nom AS nomBabysitter,
            b.prenom AS nomBabysitter,
            FROM Contrat c
            INNER JOIN Parent p
            ON c.parent = p.id
            INNER JOIN Enfant e
            ON c.enfant = e.id
            INNER JOIN Babysitter b
            ON c.babysitter = b.id
            WHERE c.id = :idContrat");

        // J'execute la requête en passant la valeur
        $requete_prepare->execute(
            array("idContrat" => $contrat));

        // Je récupère le résultat de la requête
        $contrat = $requete_prepare->fetchObject("Contrat");

        // Je retourne/renvoie la liste de hobby
        return $contrat;
    }

}

?>