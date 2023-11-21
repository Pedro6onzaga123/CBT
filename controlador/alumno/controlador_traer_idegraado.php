<?php
    require '../../modelo/modelo_alumno.php';
    $alumno = new Alumno();
    $idalum = htmlspecialchars($_POST['idusu'],ENT_QUOTES,'UTF-8');
    
    $consulta =  $alumno->traer_grado_alumno( $idalum);
    echo json_encode($consulta);
?>