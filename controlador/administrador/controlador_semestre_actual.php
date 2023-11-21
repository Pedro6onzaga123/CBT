<?php
    require '../../modelo/modelo_administrador.php';
    $MU = new Modelo_Administrador();
    $consulta = $MU->SemestreActual();
    echo json_encode($consulta);
?>