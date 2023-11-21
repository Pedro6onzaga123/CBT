


<?php
    require '../../modelo/modelo_alumno.php';
    $MU = new Alumno();

     $finicio = htmlspecialchars($_POST['finicio'],ENT_QUOTES,'UTF-8');
     $fFinal = htmlspecialchars($_POST['fFinal'],ENT_QUOTES,'UTF-8');

    $consulta = $MU->listar_alumnos_Reporte_fecha($finicio, $fFinal);
    
  
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