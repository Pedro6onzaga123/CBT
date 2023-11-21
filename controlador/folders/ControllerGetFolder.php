<?php

 require '../../modelo/modelo_Folders.php';
    $folder = new Folder;

    session_start();

if (!empty($_SESSION['S_IDUSUARIO'])) {

	$user= $_SESSION['S_IDUSUARIO'];

    $consulta = $folder->listar_folder();
    if($consulta){
        echo json_encode($consulta);
    }else{
       
    }

}else{
	 echo 500;
}


?>