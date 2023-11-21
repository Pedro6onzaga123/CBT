<?php
    require '../../modelo/modelo_alumno.php';
    $alumno = new Alumno();

     $idalum = htmlspecialchars($_POST['idalum'],ENT_QUOTES,'UTF-8');
    $consulta = $alumno->Pagos_Alumnos_Estado($idalum);
    
       echo json_encode($consulta);
?>