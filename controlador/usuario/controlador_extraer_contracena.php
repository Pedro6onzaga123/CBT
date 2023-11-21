<?php
    require '../../modelo/modelo_usuario.php';

    $MU = new Modelo_Usuario();
    $usu_id = htmlspecialchars($_POST['id_usu'],ENT_QUOTES,'UTF-8');
    $consulta = $MU->Extraer_contracena($usu_id);
    $data = json_encode($consulta);
    if(count($consulta)>0){
        echo $data;
    }else{
        echo 0;
    }

?>