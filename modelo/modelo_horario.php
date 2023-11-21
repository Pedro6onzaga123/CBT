<?php
    class  Horario{
        public  $codigo;

        private $conexion;
        function __construct(){
            require_once 'modelo_conexion.php';
            $this->conexion = new conexion();
            $this->conexion->conectar();
            $this->codigo='';
        }
    
 function listar_combo_cursos(){
     $sql = "SELECT idcurso, nonbrecurso FROM curso";
      $arreglo = array();
      if ($consulta = $this->conexion->conexion->query($sql)) {
        while ($consulta_VU = mysqli_fetch_array($consulta)) {
                        $arreglo[] = $consulta_VU;
        }
        return $arreglo;
        $this->conexion->cerrar();
      }
  }

 function Registar_horario($xidhorario, $idhora, $idcurso, $dia,$idgradoH) {
            
         $sql ="INSERT INTO horario_curso (idhorariocurso, idhora, idcurso, dia,gradoid,FechRegistro,statushorario) VALUES ('$xidhorario', '$idhora', '$idcurso', '$dia','$idgradoH',NOW(),'ACTIVO') ";
            if ($consulta = $this->conexion->conexion->query($sql)) {
            return 1;
                
            }else{
                return 0;
                 $this->conexion->cerrar();
            } 
       
        }

function Verificar_Existe($idgrado){
    $sql = "SELECT gradoid FROM horario_curso where gradoid='$idgrado'";
      $arreglo = array();
      if ($consulta = $this->conexion->conexion->query($sql)) {
        while ($consulta_VU = mysqli_fetch_array($consulta)) {
                        $arreglo[] = $consulta_VU;
        }
        return count($arreglo);
        $this->conexion->cerrar();
      } 

}

   function consultahorarioCurso($dia, $hora) {
            $arreglo = array();
            
                return $arreglo;
                $this->conexion->cerrar();
            }

  function ListarHoras() {

              $sql = "SELECT * FROM hora";
            $arreglo = array();
            if ($consulta = $this->conexion->conexion->query($sql)) {
                while ($consulta_VU = mysqli_fetch_array($consulta)) {
                        $arreglo[] = $consulta_VU;
                }
                return $arreglo;
                $this->conexion->cerrar();
            }

           }

         function eliminar($xidhorario){
          
             $sql=  "DELETE FROM horario_curso WHERE idhorariocurso = '$xidhorario' ";

            if ($consulta = $this->conexion->conexion->query($sql)) {
              return 1;
        
            }else{
                return 0;
             }



    } 
  
   /*function listar_Horario(){
      $sql=  "select DISTINCT  codigo ,gradonombre ,statushorario  from horario_curso
           inner join  grado on horario_curso.gradoid = grado.idgrado";
            $arreglo = array();
            if ($consulta = $this->conexion->conexion->query($sql)) {
                while ($consulta_VU = mysqli_fetch_assoc($consulta)) {

                    $arreglo["data"][]=$consulta_VU;

                }
                return $arreglo;
                $this->conexion->cerrar();
            }
           }
*/

function listar_Horario() {
    $sql = "SELECT gradoid, gradonombre, statushorario FROM horario_curso
            INNER JOIN grado ON horario_curso.gradoid = grado.idgrado";
    $arreglo = array();
    $valoresUnicos = array();  // Array para realizar un seguimiento de los valores únicos

    if ($consulta = $this->conexion->conexion->query($sql)) {
        while ($consulta_VU = mysqli_fetch_assoc($consulta)) {
            $valorUnico = $consulta_VU['gradoid'];  // Columna que quieres que sea única
            
            // Verificar si el valor único ya existe en el array
            if (!in_array($valorUnico, $valoresUnicos)) {
                $arreglo["data"][] = $consulta_VU;
                $valoresUnicos[] = $valorUnico;  // Agregar el valor único al array
            }
        }
        
        $this->conexion->cerrar();  // Cerrar la conexión a la base de datos
    }

    return $arreglo;
}



 function mostratarHorario($dia,$hora,$miCodigo){

    $sql="select idhorariocurso,nonbrecurso from horario_curso 
             inner join curso  on curso.idcurso = horario_curso.idcurso
             WHERE idhora = '$hora' AND dia = '$dia' AND gradoid='$miCodigo'";
            $arreglo = array();
            if ($consulta = $this->conexion->conexion->query($sql)) {
                while ($consulta_VU = mysqli_fetch_assoc($consulta)) {

                    $arreglo[]=$consulta_VU;

                }
                return $arreglo;
                $this->conexion->cerrar();
            }
            
           }

   function ConsultarHorario($dia,$hora){

    $sql="select idhorariocurso,nonbrecurso from horario_curso 
             inner join curso  on curso.idcurso = horario_curso.idcurso
             WHERE idhora = '$hora' AND dia = '$dia' ";
            $arreglo = array();
            if ($consulta = $this->conexion->conexion->query($sql)) {
                while ($consulta_VU = mysqli_fetch_assoc($consulta)) {

                    $arreglo[]=$consulta_VU;

                }
                return $arreglo;
                $this->conexion->cerrar();
            }
            
           }


   function delete_registro($codigo){

     $sql=  "DELETE FROM horario_curso WHERE gradoid = '$codigo' ";

            if ($consulta = $this->conexion->conexion->query($sql)) {
              return 1;
        
            }else{
                return 0;
             }
   }


    }
?>