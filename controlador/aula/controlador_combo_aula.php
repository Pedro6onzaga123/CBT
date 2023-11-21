<?php
    require '../../modelo/modelo_aula.php';
    $aula = new Aula();
    $consulta = $aula->listar_combo_aulas();
    echo json_encode($consulta);
?>