<?php
    class Curso{
        private $conexion;
        function __construct(){
            require_once 'modelo_conexion.php';
            $this->conexion = new conexion();
            $this->conexion->conectar();
        }

        

function combo_cursos_libre(){

 $sql = "SELECT idcurso, nonbrecurso FROM curso WHERE statuscurso='LIBRE'";
      $arreglo = array();
      if ($consulta = $this->conexion->conexion->query($sql)) {
        while ($consulta_VU = mysqli_fetch_array($consulta)) {
                        $arreglo[] = $consulta_VU;
        }
        return $arreglo;
        $this->conexion->cerrar();
      }

}

function Eliminar_Curso($idcurso){

    $sql=   "DELETE FROM curso WHERE idcurso = '$idcurso'";
    
      if ($consulta = $this->conexion->conexion->query($sql)) {
        return 1;
      }else{
        return 0;
      }
}
function Listar_Curso(){
 $sql=  "SELECT idcurso, cursoCodigo, nonbrecurso, credito, statuscurso, stadodocent FROM curso";
            $arreglo = array();
            if ($consulta = $this->conexion->conexion->query($sql)) {
                while ($consulta_VU = mysqli_fetch_assoc($consulta)) {

                    $arreglo["data"][]=$consulta_VU;

                }
                return $arreglo;
                $this->conexion->cerrar();
            }

}

function Registrar_Curso($codigocur,$nombre,$credito,$tipo){
  
 $sql = "insert into curso(cursoCodigo, nonbrecurso, credito, fechaRegistro,fechaActualizacion, tipo) 
                 values ('$codigocur','$nombre','$credito',NOW(),NOW(),'$tipo')";
            if ($consulta = $this->conexion->conexion->query($sql)) {
             return 1;
               }else{
                return 0;
              }

}

function Update_Curso($idcurso,$codigcurso,$nombre,$credito,$tipo){
$sql = "update curso set cursoCodigo = '$codigcurso',nonbrecurso='$nombre',credito='$credito',fechaActualizacion = NOW(),tipo='$tipo' WHERE idcurso= '$idcurso'";
            if ($consulta = $this->conexion->conexion->query($sql)) {
                return 1;
                
            }else{
                return 0;
            }



}


    }
?>
