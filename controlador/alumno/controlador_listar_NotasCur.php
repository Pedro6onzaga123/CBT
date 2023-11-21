<?php
    require '../../modelo/modelo_alumno.php';
    $alumno = new Alumno();
    $curso = htmlspecialchars($_POST['idcurso'],ENT_QUOTES,'UTF-8');
     $alum = htmlspecialchars($_POST['idalumo'],ENT_QUOTES,'UTF-8');
    
    $consulta =  $alumno->listar_NotasCur($curso,$alum);
    echo json_encode($consulta);
   /*if($consulta){
        echo json_encode($consulta);
    }else{
        echo '{
            "sEcho": 1,
            "iTotalRecords": "0",
            "iTotalDisplayRecords": "0",
            "aaData": []
        }';
    }*/
?>