<?php

/* 1 bug */
    function toutVaBien ($moral) {
        if($moral === true) { // bug ($moral = true)
            echo "tout va bien";
        }else{
            echo "ça ne va pas";
        }
    }
toutVaBien(true);

?>