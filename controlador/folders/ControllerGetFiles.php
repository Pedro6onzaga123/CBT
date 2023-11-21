
<?php
 require '../../modelo/modelo_Folders.php';
    $folder = new Folder;

    session_start();

if (!empty($_SESSION['S_IDUSUARIO'])) {

	 $idfolder = htmlspecialchars($_POST['idfolder'], ENT_QUOTES,'UTF-8');

	$user= $_SESSION['S_IDUSUARIO'];

    $consulta = $folder->listar_Files($idfolder);
   
        echo json_encode($consulta);
   

}else{
	 echo 500;
}


?>