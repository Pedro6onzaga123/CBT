<?php
 require '../../modelo/modelo_Folders.php';
    $folder = new Folder;

    session_start();

if (!empty($_SESSION['S_IDUSUARIO'])) {

	 $idfile = htmlspecialchars($_POST['idfile'], ENT_QUOTES,'UTF-8');

	$user= $_SESSION['S_IDUSUARIO'];

    $consulta = $folder->Show_Files($idfile);
   
        echo json_encode($consulta);
   

}else{
	 echo 500;
}


?>