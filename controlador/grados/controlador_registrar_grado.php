<?php
    require '../../modelo/modelo_grado.php';
    $grado = new Grado();

    $nombre = htmlspecialchars($_POST['nomb'],ENT_QUOTES,'UTF-8');
     $vacat = htmlspecialchars($_POST['vact'],ENT_QUOTES,'UTF-8');
    $sem = htmlspecialchars($_POST['sem'],ENT_QUOTES,'UTF-8');
    $aula = htmlspecialchars($_POST['aula'],ENT_QUOTES,'UTF-8'); 
   $consulta = $grado->Registrar_Grado($nombre,$sem,$aula,$vacat);
    echo $consulta;

?>