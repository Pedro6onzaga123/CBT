<?php 
    require '../../modelo/modelo_docente.php';
    $docent = new Docente;
    $idgrado = htmlspecialchars($_POST['idgrado'],ENT_QUOTES,'UTF-8');
    $iddoce = htmlspecialchars($_POST['iddoce'],ENT_QUOTES,'UTF-8');
    $consulta = $docent->listar_gradoscursosdocent($idgrado,$iddoce);
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