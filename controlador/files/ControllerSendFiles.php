

<?php
 require '../../modelo/modelo_Files.php';
    $file = new Files;

    session_start();

if (!empty($_SESSION['S_IDUSUARIO'])) {

	$user= $_SESSION['S_IDUSUARIO'];

    $gradosId = htmlspecialchars($_POST['gradosId'], ENT_QUOTES, 'UTF-8');
   
// Ruta de la carpeta de destino
$carpetaDestino = '../../Files/';

// Verificar si se han enviado archivos
if (isset($_FILES['files'])) {
    $archivos = $_FILES['files'];

    date_default_timezone_set('America/Lima');
    $fecha = date("Y-m-d H:i:s");

    // Recorrer cada archivo
    for ($i = 0; $i < count($archivos['name']); $i++) {
        $nombreArchivo = $archivos['name'][$i];
        $rutaTempArchivo = $archivos['tmp_name'][$i];
        $extension = pathinfo($nombreArchivo, PATHINFO_EXTENSION);

        $nombreArchivoOriginal = $nombreArchivo; // Guardar el nombre original para la consulta

        // Verificar si ya existe un archivo con el mismo nombre
        $contador = 1;
        while (file_exists($carpetaDestino . $nombreArchivo)) {
            $nombreArchivo = '(' . $contador . ')' . $nombreArchivoOriginal;
            $contador++;
        }

        // Generar una ruta única para el archivo destino
        $rutaDestino = $carpetaDestino . $nombreArchivo;

        // Mover el archivo a la carpeta destino
        if (move_uploaded_file($rutaTempArchivo, $rutaDestino)) {
            // El archivo se ha movido exitosamente
            // echo 'El archivo ' . $nombreArchivo . ' se ha subido correctamente.';

            $consulta = $file->Registra_Files_Grado($nombreArchivo, $extension, $fecha, $gradosId);


        } else {
            // Hubo un error al mover el archivo
            echo 'Error al subir el archivo ' . $nombreArchivo . '.';
        }
    }
    echo  $consulta;
}


}else{
	echo 500;
}

?>