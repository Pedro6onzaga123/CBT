<?php
    require '../../modelo/modelo_grado.php';
    $grado = new Grado();
    $consulta = $grado->listar_grados();
    

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