<?php
   require '../../modelo/modelo_administrador.php';
    $MU = new Modelo_Administrador();

    $nombre = htmlspecialchars($_POST['nomb'],ENT_QUOTES,'UTF-8');
    $sem = htmlspecialchars($_POST['sem'],ENT_QUOTES,'UTF-8');
    $aula = htmlspecialchars($_POST['aula'],ENT_QUOTES,'UTF-8');
    
   $consulta = $MU->Registrar_Grado($nombre,$sem,$aula);
    echo $consulta;

?>