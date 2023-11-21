<?php
    require '../../modelo/modelo_administrador.php';
    $MU = new Modelo_Administrador();

    $nombAlum = htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8');
    $consulta = $MU->listar_meses_pagados($nombAlum);
    
       echo json_encode($consulta);
    
?>