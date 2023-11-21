<?php
   require '../../modelo/modelo_administrador.php';
    $MU = new Modelo_Administrador();
    $idusuario = htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8');

    $consulta = $MU->Eliminar_Alumnos($idusuario);
    echo $consulta;

?>