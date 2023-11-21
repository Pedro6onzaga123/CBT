<?php
    require '../../modelo/modelo_alumno.php';
    $alumno = new Alumno();

    $usuario = htmlspecialchars($_POST['user'],ENT_QUOTES,'UTF-8');
    $contra =htmlspecialchars($_POST['pass'],ENT_QUOTES,'UTF-8');
    
   $consulta = $alumno->VerificarAlumno($usuario,$contra);
    $data = json_encode($consulta);
    if(count($consulta)>0){
        echo $data;
    }else{
        echo 0;
    }
?>