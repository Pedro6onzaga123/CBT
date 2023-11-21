
<?php
    class Files{
        private $conexion;
        function __construct(){
            require_once 'modelo_conexion.php';
            $this->conexion = new conexion();
            $this->conexion->conectar();
        }

function listar_Grados_Docente($idprofe) {
    $sql = "SELECT idgrado, gradonombre, cantidad_alum FROM docenteasignado
            INNER JOIN grado ON grado.idgrado = docenteasignado.grado_id
            WHERE docenteid = '$idprofe'";

    $arreglo = array();
    $grados = array();

    if ($consulta = $this->conexion->conexion->query($sql)) {
        while ($consulta_VU = mysqli_fetch_assoc($consulta)) {
            $idgrado = $consulta_VU['idgrado'];

            // Verificar si el grado ya ha sido agregado al arreglo
            if (!in_array($idgrado, $grados)) {
                $grados[] = $idgrado;
                $arreglo[] = $consulta_VU;
            }
        }

        return $arreglo;
        $this->conexion->cerrar();
    }
}

function Registra_Files_Grado($nombreArchivo,$extension,$fecha,$gradosId){
 $sql = "INSERT INTO files (nombrearchivo, extension, fechaCreate, gradoid_file) VALUES ('$nombreArchivo','$extension','$fecha','$gradosId')";

            if ($consulta = $this->conexion->conexion->query($sql)) {
           return 1;    
            }else{
                return 0;
            }

}


function Registra_Files_Grado_Foders($nombreArchivo,$extension,$fecha,$gradosId,$idforder){
 $sql = "INSERT INTO files (nombrearchivo, extension, fechaCreate, gradoid_file,idfolder) VALUES ('$nombreArchivo','$extension','$fecha','$gradosId','$idforder')";

            if ($consulta = $this->conexion->conexion->query($sql)) {
           return 1;    
            }else{
                return 0;
            }

}



    function listar_Archivos(){
    $sql  = "select idfile, nombrearchivo, fechaCreate, gradonombre from files
            inner join  grado on grado.idgrado = files.gradoid_file ORDER BY fechaCreate DESC";     
            $arreglo = array();
           if ($consulta = $this->conexion->conexion->query($sql)) {
           while ($consulta_VU = mysqli_fetch_assoc($consulta)) {
                   $arreglo['data'][]=$consulta_VU;
          }
          return $arreglo;
          $this->conexion->cerrar();
          }
    }

  function Extraer_Nombre_file($idArchivo){
   
    $sql  = "select  nombrearchivo from files where idfile='$idArchivo' ";     
            $arreglo = array();
           if ($consulta = $this->conexion->conexion->query($sql)) {
           while ($consulta_VU = mysqli_fetch_assoc($consulta)) {
                   $arreglo[]=$consulta_VU;
          }
          return $arreglo;
          $this->conexion->cerrar();
          }

  } 

  function Quitar_file($idArchivo){

     $sql=   "DELETE FROM files WHERE idfile = '$idArchivo'";

      if ($consulta = $this->conexion->conexion->query($sql)) {
        return 1;
        
      }else{
        return 0;
      }
  } 


    }
?>


