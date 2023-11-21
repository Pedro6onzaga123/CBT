
<?php
    class Folder{
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

    function listar_folder(){
    $sql  = "SELECT idforder,nameforder FROM folders;";     
            $arreglo = array();
           if ($consulta = $this->conexion->conexion->query($sql)) {
           while ($consulta_VU = mysqli_fetch_assoc($consulta)) {
                   $arreglo[]=$consulta_VU;
          }
          return $arreglo;
          $this->conexion->cerrar();
          }
    }

  function listar_Files($idfolder){
  
   $sql  = "SELECT idfile, nombrearchivo, fechaCreate FROM files WHERE idfolder='$idfolder' ";     
            $arreglo = array();
           if ($consulta = $this->conexion->conexion->query($sql)) {
           while ($consulta_VU = mysqli_fetch_assoc($consulta)) {
                   $arreglo[]=$consulta_VU;
          }
          return $arreglo;
          $this->conexion->cerrar();
          }

  }  

function Show_Files($idfile){

   $sql  = "SELECT idfile, nombrearchivo FROM files WHERE idfile='$idfile' ";     
            $arreglo = array();
           if ($consulta = $this->conexion->conexion->query($sql)) {
           while ($consulta_VU = mysqli_fetch_assoc($consulta)) {
                   $arreglo[]=$consulta_VU;
          }
          return $arreglo;
          $this->conexion->cerrar();
          }
}




    }
?>


