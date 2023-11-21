<?php
    require '../../modelo/modelo_grado.php';
    $grado = new Grado();

    $idgrado = htmlspecialchars($_POST['idgrado'],ENT_QUOTES,'UTF-8');
     $nombregrad = htmlspecialchars($_POST['nombregrad'],ENT_QUOTES,'UTF-8');
    $numvaca = htmlspecialchars($_POST['numvaca'],ENT_QUOTES,'UTF-8');
    $estadograd = htmlspecialchars($_POST['estadograd'],ENT_QUOTES,'UTF-8');
    
   $consulta = $grado->Update_Grado($idgrado,$nombregrad,$numvaca,$estadograd);
    echo $consulta;

?>