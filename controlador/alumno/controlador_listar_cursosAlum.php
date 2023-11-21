<?php
    require '../../modelo/modelo_alumno.php';
    $alumno = new Alumno();
    $idGrado = htmlspecialchars($_POST['idGrado'],ENT_QUOTES,'UTF-8');
    
    $consulta =  $alumno->listar_cursosAlum($idGrado);
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