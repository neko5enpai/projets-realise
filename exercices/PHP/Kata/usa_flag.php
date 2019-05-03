<code>
<!-- PHP -->
  <?php
    $_6stars = "* * * * * * ==========================================<br>"; // 6 étoiles
    $_5stars = "&nbsp;* * * * * &nbsp;==========================================<br>"; // 5 étoiles
    $_0stars = "======================================================<br>"; // 0 étoiles


    for ($i = 0; $i < 15; $i++) { // Définition de la valeur i = zéro
      if ($i > 8) { // Condition (if else)
        echo $_0stars; // Affichage du texte (echo)
      } else {
        if ($i % 2 === 0) {
            echo $_6stars;
        } else {
            echo $_5stars;
        }
      }
    }

  ?>
<!-- FIN PHP -->
</code> 
