
<?php
    class Grado{
        private $conexion;
        function __construct(){
            require_once 'modelo_conexion.php';
            $this->conexion = new conexion();
            $this->conexion->conectar();
        }

        function listar_combo_grados(){
         $sql = "SELECT idgrado, gradonombre FROM grado";
          $arreglo = array();
           if ($consulta = $this->conexion->conexion->query($sql)) {
           while ($consulta_VU = mysqli_fetch_array($consulta)) {
                        $arreglo[] = $consulta_VU;
           }
          return $arreglo;
           $this->conexion->cerrar();
      }
}

function Registrar_Grado($nombre,$sem,$aula,$vacat){
 $sql = "insert into grado( gradonombre,gradostatus,aula_id,fechaRegistro,fechaActualizacion,cantidad_alum,semestre) values ( '$nombre', 'ACTIVO','$aula',NOW(),NOW(),'$vacat','$sem' )";
     
            if ($consulta = $this->conexion->conexion->query($sql)) {
                $this->cambiarestadoAula($aula);
             return 1;  
               }else{
                return 0;
           }
    }
//CAMBIAR ESTADO DE AULA CUANDO SE ASIGNA A UN GRADO
function cambiarestadoAula($aula){
     $sql = "update aula set status = 'OCUPADO' where idaula = '$aula'";
            if ($consulta = $this->conexion->conexion->query($sql)) {
                return 1;
            }else{
                return 0;
            }


}

function Update_Grado($idgrado,$nombregrad,$numvaca,$estadograd){
    $sql = "update grado set gradonombre = '$nombregrad',gradostatus='$estadograd',cantidad_alum='$numvaca'  where idgrado = '$idgrado'";
            if ($consulta = $this->conexion->conexion->query($sql)) {
                return 1;
            }else{
                return 0;
            }
}


   function listar_grados(){ 
          $sql = "select idgrado, gradonombre, gradostatus,cantidad_alum,nombreaula,seccion from grado
                      inner join  aula on aula.idaula = grado.aula_id";
            $arreglo = array();
            if ($consulta = $this->conexion->conexion->query($sql)) {
                while ($consulta_VU = mysqli_fetch_assoc($consulta)) {

                    $arreglo["data"][]=$consulta_VU;

                }
                return $arreglo;
                $this->conexion->cerrar();
            }
        }


function Eliminar_Grado($idgrado){

  $sql=   "DELETE FROM grado WHERE idgrado = '$idgrado'";

      if ($consulta = $this->conexion->conexion->query($sql)) {
        return 1;
        
      }else{
        return 0;
      }


}

function Registro_Curso_Grado($idgrado,$semestre,$arreglo){
 $sql = "insert into grado_curso( grado_id, semestre,curso_id) values ('$idgrado','$semestre','$arreglo')";
     
            if ($consulta = $this->conexion->conexion->query($sql)) {
             return 1;
                
               }else{
                return 0;
              }
}



function Ver_Grado_Curso($id){
   $sql  = "select idcurso, cursoCodigo, nonbrecurso from grado_curso
            inner join  curso on curso.idcurso = grado_curso.curso_id
          where grado_id='$id'";     
            $arreglo = array();
                if ($consulta = $this->conexion->conexion->query($sql)) {
                 while ($consulta_VU = mysqli_fetch_assoc($consulta)) {
                         $arreglo['data'][]=$consulta_VU;
                }
                return $arreglo;
                $this->conexion->cerrar();

               }
       }

function Quitar_curso($idcurso){//eliminar solo si estado de curso esta PENDIENTE
 /*$sql =   "delete grado_curso from  grado_curso 
 inner join  curso on   grado_curso.curso_id = curso.idcurso
 WHERE curso_id = '$idcurso' and stadodocent='PENDIENTE'";*/

 $sql=   "DELETE FROM grado_curso  WHERE curso_id = '$idcurso'";

      if ($consulta = $this->conexion->conexion->query($sql)) {
         $this->Recontruit_stado_curso($idcurso);

        return 1;
        
      }else{
        return 0;
      }

}


function extrae_Curso($idcurso){
 $sql = "SELECT stadodocent FROM curso where idcurso ='$idcurso'";
            $arreglo = array();
            if ($consulta = $this->conexion->conexion->query($sql)) {
                while ($consulta_VU = mysqli_fetch_assoc($consulta)) {

                    $arreglo[]=$consulta_VU;

                }
                return $arreglo;
                $this->conexion->cerrar();
            }

}


function Cambiar_estado_curso($arreglo){

 $sql = "UPDATE curso SET statuscurso = 'ASIGNADO' WHERE idcurso = '$arreglo'";
      if ($consulta = $this->conexion->conexion->query($sql)) {
        return 1;
        
      }else{
        return 0;
      }

}

function Recontruit_stado_curso($idcurso){

 $sql = "UPDATE curso SET statuscurso = 'LIBRE' WHERE idcurso = '$idcurso'";
      if ($consulta = $this->conexion->conexion->query($sql)) {
        return 1; 
      }else{
        return 0;
      }

}





    }
?>


