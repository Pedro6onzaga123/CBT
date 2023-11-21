
<?php
    require '../../modelo/modelo_alumno.php';
    $MU = new Alumno();
    $consulta = $MU->listar_alumnos_Reporte();
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