
<?php
    require '../../modelo/modelo_docente.php';
    $docent = new Docente;
    $consulta = $docent->listar_docente_report();
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