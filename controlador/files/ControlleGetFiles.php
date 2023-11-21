
<?php

 require '../../modelo/modelo_Files.php';
    $file = new Files;

    session_start();

if (!empty($_SESSION['S_IDUSUARIO'])) {

	$user= $_SESSION['S_IDUSUARIO'];

    $consulta = $file->listar_Archivos();
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

}else{
	 echo '{
		    "sEcho": 1,
		    "iTotalRecords": "0",
		    "iTotalDisplayRecords": "0",
		    "aaData": []
		}';
}


?>