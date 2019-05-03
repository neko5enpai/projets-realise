<?php
class Contrat {
    private $id;
    private $nomBabysitter;
    private $prenomBabysitter;
    private $ageBabysitter;
    private $nomParent;
    private $prenomParent;
    private $adresse;
    private $nomEnfant;
    private $prenomEnfant;
    private $ageEnfant;
    private $dateDebut;

    public function __set($name, $value) {void;}
    public function getId() {return $this->id;}
    public function getNomBabysitter() {return $this->nomBabysitter;}
    public function getPrenomBabysitter() {return $this->prenomBabysitter;}
    public function getAgeBabysitter() {return $this->ageBabysitter;}
    public function getNomParent() {return $this->nomParent;}
    public function getPrenomParent() {return $this->prenomParent;}
    public function getAdresse() {return $this->adresse;}
    public function getNomEnfant() {return $this->nomEnfant;}
    public function getPrenomEnfant() {return $this->prenomEnfant;}
    public function getDateDebut() {return $this->dateDebut;}
    
}

?>