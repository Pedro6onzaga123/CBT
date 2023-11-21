<?php
    require '../../modelo/modelo_aula.php';
    $aula = new Aula();

    $consulta = $aula->listar_Aulas();
    if($consulta){
        echo json_encode($consulta);
    }else{
        echo '{
            "sEcho": 1,
            "iTotalRecords": "0",
            "iTotalDisplayRecords": "0",
            "aaData": []
        }';
    }

?>