<?php

/* 3 bugs */

    function nomdeLafonction ($x) { // mettre un nom à la fonction
        $pair = ($x % 2 == 0); 
        return $pair; // return était en français / il manquait le ;
    }
    

?>