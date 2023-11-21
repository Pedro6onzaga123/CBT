<?php
    require '../../modelo/modelo_alumno.php';
    $alumno = new Alumno();
    $idalum = htmlspecialchars($_POST['id_usu'],ENT_QUOTES,'UTF-8');
    
    $consulta =  $alumno->Extraer_contra_Alum( $idalum);
    $data = json_encode($consulta);
    if(count($consulta)>0){
        echo $data;
    }else{
        echo 0;
    }
?>