<?php
$input = "Digital";
$majuscule = strtoupper($input);

function majuscule($str) {
    $result= " ";
    for($i=0; $i < strlen($str); $i++) {
        $result .= strtoupper($str[$i]);
    }
    return $result;

}
echo majuscule ("Digital");

?>
