<?php
   require '../../modelo/modelo_administrador.php';
    $MU = new Modelo_Administrador();
   
     $idesemtnew = htmlspecialchars($_POST['idsemtnew'],ENT_QUOTES,'UTF-8');
     $nombsemtnew = htmlspecialchars($_POST['nombsemtnew'],ENT_QUOTES,'UTF-8');
      $semtA = htmlspecialchars($_POST['semAc'],ENT_QUOTES,'UTF-8');
   $consulta = $MU->Cambiar_semetre($idesemtnew,$nombsemtnew,$semtA);
    echo $consulta;

?>