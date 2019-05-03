<?php
class Connexion{
    private $connexion;
    public function __construct() {

    }

    public function getCustomerById($id) {
        $stmt = $this->connexion->prepare(
            "SELECT * FROM Customers WHERE id = :idCustomer"
        );
        $stmt->execute(array("id" => $id));
        return $stmt->fetchAll(PDO::FETCH_CLASS, "Customer");
    }
}
?>