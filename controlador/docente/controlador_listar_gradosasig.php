<?php
    require '../../modelo/modelo_docente.php';
    $docent = new Docente;
    $idprofe = htmlspecialchars($_POST['iddocente'],ENT_QUOTES,'UTF-8');
    $consulta = $docent->listar_gradosdocent($idprofe);
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