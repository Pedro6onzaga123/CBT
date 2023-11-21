




<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['idArchivo'])) {

 require '../../modelo/modelo_Files.php';
    $file = new Files;

    session_start();

if (!empty($_SESSION['S_IDUSUARIO'])) {


    $idArchivo = $_POST['idArchivo'];

    $nombrefile=$file->Extraer_Nombre_file($idArchivo);

    if ($nombrefile[0]["nombrearchivo"]) {
    	
    	$name= $nombrefile[0]["nombrearchivo"];
         
          // Ejemplo: Eliminar el archivo físicamente
    	   $rutaArchivo = '../../Files/' . $name;  // Ruta del archivo en el sistema de archivos
           if (file_exists($rutaArchivo)) {
              unlink($rutaArchivo);  // Eliminar el archivo
            }
      $consulta = $file->Quitar_file($idArchivo);
    }
    
    // Realiza las operaciones necesarias para eliminar el archivo con el ID proporcionado
    // Aquí puedes incluir la lógica para verificar permisos, eliminar el archivo físicamente, actualizar la base de datos, etc.
    
   
   
    
    // Realiza cualquier otra acción requerida después de eliminar el archivo
    
    // Puedes enviar una respuesta JSON al cliente para indicar el resultado de la operación
    $response = ['success' => true, 'message' => 'Archivo eliminado correctamente'];
    echo json_encode($consulta);
    exit;
}



}else{
	

}


?>
