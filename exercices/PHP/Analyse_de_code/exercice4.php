<?php

class Elephant {
    private $age;

    public function __construct() {
        $this->age = 1;
    }

    private function getAge() {
        return $this->age;
    }

    private function grandir($annees) {
        if($annees > $this->age) {
            $this->age = $annees;
        }
    }
}

$jumbo = new Elephant();
$jumbo->grandir(5);
echo $jumbo->getAge();

?>