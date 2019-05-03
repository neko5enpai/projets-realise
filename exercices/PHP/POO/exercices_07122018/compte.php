<?php

class Compte
{
    private $solde;
    private $iban;
    private $limite;
    private $prenom;
    private $nom;

    public function __construct($nom, $prenom, $iban, $limite)
    {
        $this->nom = $nom;
        $this->prenom = $prenom;
        $this->iban = $iban;
        $this->limite = $limite;
        $this->solde = 0;
    }

    public function debit($montant)
    {
        $solde = $this->solde - $montant;
        if ($solde > $this->limite) {
            $this->solde = $solde;
            return true;
        } else {
            return false;
        }
    }

    function depot($montant)
    {
        $this->solde += $montant;
        return $this->solde;
    }

    public function getSolde()
    {
        return $this->solde;
    }

    public function getIban()
    {
        return $this->iban;
    }

    public function getPrenom()
    {
        return $this->prenom;
    }

    public function getNom()
    {
        return $this->nom;
    }

    public function getLimite()
    {
        return $this->limite;
    }

    function afficherProprietaire()
    {
        echo $this->nom . ' ' . $this->prenom . ' (' . $this->iban . ')<br>';
    }
}

$compte1 = new Compte("Berset", "Vincent", "CH-123-34-5432", -1000);
$compte2 = new Compte("Benitez", "Johana", "CH-533-24-6245", -2000);

$compte1->debit(500);

echo var_dump($compte1) . '<br><br>';

$compte1->afficherProprietaire();
$compte2->afficherProprietaire();

?>