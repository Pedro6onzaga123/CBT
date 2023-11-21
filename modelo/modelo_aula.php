<?php
    class Aula{
        private $conexion;
        function __construct(){
            require_once 'modelo_conexion.php';
            $this->conexion = new conexion();
            $this->conexion->conectar();
        }

   //muestra aulas en combo de registrar grado EATADO LIBRE      
function listar_combo_aulas(){
  $sql = "SELECT idaula, nombreaula,aforro,seccion FROM aula WHERE status='LIBRE'";
      $arreglo = array();
      if ($consulta = $this->conexion->conexion->query($sql)) {
        while ($consulta_VU = mysqli_fetch_array($consulta)) {
                        $arreglo[] = $consulta_VU;
        }
        return $arreglo;
        $this->conexion->cerrar();
      }

}
   
   function Registrar_Aula($nombre,$piso,$numero,$aforro,$seccion,$estado){ 
     $sql = "INSERT INTO aula(nombreaula, piso, numero, aforro, seccion, status) VALUES ('$nombre','$piso','$numero','$aforro','$seccion','$estado')";
            if ($consulta = $this->conexion->conexion->query($sql)) {
           return 1;    
            }else{
                return 0;
            }
         }  




function listar_Aulas(){
    $sql=  "select idaula, nombreaula, piso, numero, aforro,seccion,status from aula ";
            $arreglo = array();
            if ($consulta = $this->conexion->conexion->query($sql)) {
                while ($consulta_VU = mysqli_fetch_assoc($consulta)) {
                    $arreglo["data"][]=$consulta_VU;
                }
                return $arreglo;
                $this->conexion->cerrar();
            }
        }

 function Actualizar_Aula($idAula,$nombre,$piso,$numero,$aforro,$seccion,$estado){
  
         $sql = "update aula set nombreaula = '$nombre',piso='$piso',numero='$numero',aforro='$aforro',seccion='$seccion',status='$estado' WHERE idaula= '$idAula'";
            if ($consulta = $this->conexion->conexion->query($sql)) {
                return 1;
                
            }else{
                return 0;
            }

 }

function Eliminar_aula($idAula){

 $sql=   "DELETE FROM aula WHERE idaula = '$idAula'";

      if ($consulta = $this->conexion->conexion->query($sql)) {
        return 1;
        
      }else{
        return 0;
      }

}



     }
?>