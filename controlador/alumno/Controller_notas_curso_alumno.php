<?php
    
     require '../../modelo/modelo_alumno.php';
    $alumno = new Alumno();
    $curso = htmlspecialchars($_POST['idcurso'],ENT_QUOTES,'UTF-8');
     $alum = htmlspecialchars($_POST['idalumo'],ENT_QUOTES,'UTF-8');
      $consulta =  $alumno->list_notas_course($curso,$alum);
    echo json_encode($consulta);
?>

