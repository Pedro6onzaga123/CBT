
<?php
    require '../../modelo/modelo_docente.php';
    $docent = new Docente();

   $gradoID = htmlspecialchars($_POST['gradoID'],ENT_QUOTES,'UTF-8');
    $cursoID = htmlspecialchars($_POST['cursoID'],ENT_QUOTES,'UTF-8');
    
    $consulta = $docent->listar_Notas_Reportes($gradoID,$cursoID);
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