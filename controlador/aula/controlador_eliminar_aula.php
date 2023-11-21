<?php
    require '../../modelo/modelo_aula.php';
    $aula = new Aula();
    $idAula = htmlspecialchars($_POST['idAula'],ENT_QUOTES,'UTF-8');
    $consulta = $aula->Eliminar_aula($idAula);
    echo $consulta;

?>