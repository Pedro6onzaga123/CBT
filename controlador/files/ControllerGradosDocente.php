<?php

 require '../../modelo/modelo_Files.php';
    $file = new Files;

    session_start();

if (!empty($_SESSION['S_IDUSUARIO'])) {

	$user= $_SESSION['S_IDUSUARIO'];

    $consulta = $file->listar_Grados_Docente($user);
    echo json_encode($consulta);

}else{
	echo 500;
}


?>