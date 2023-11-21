<?php
    class Modelo_Administrador{
        private $conexion;
        function __construct(){
            require_once 'modelo_conexion.php';
            $this->conexion = new conexion();
            $this->conexion->conectar();
        }

         

          function Extraer_contracena($usu_id){
               $sql = "SELECT usu_id,usu_contrasena FROM usuarios WHERE usu_id='$usu_id'";
            $arreglo = array();
            if ($consulta = $this->conexion->conexion->query($sql)) {
                while ($consulta_VU = mysqli_fetch_array($consulta)) {
                   
                        $arreglo[] = $consulta_VU;
                    
                }
                return $arreglo;
                $this->conexion->cerrar();
            }
        }


function listar_combo_niveles(){
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



function SemestreActual(){
 $sql = "SELECT idsemestres, semestresnombre FROM semestres";
      $arreglo = array();
      if ($consulta = $this->conexion->conexion->query($sql)) {
        while ($consulta_VU = mysqli_fetch_array($consulta)) {
                        $arreglo[] = $consulta_VU;
        }
        return $arreglo;
        $this->conexion->cerrar();
      }
}


function Cambiar_semetre($idesemtnew,$nombsemtnew,$semtA){
 $sql = "UPDATE semestres SET idsemestres='$idesemtnew',semestresnombre = '$nombsemtnew' WHERE idsemestres = '$semtA'";

            if ($consulta = $this->conexion->conexion->query($sql)) {
                return 1;
                
            }else{
                return 0;
            }
}

function Eliminar_Alumnos($idusuario){
$sql=   "DELETE FROM alumno WHERE idalumno = '$idusuario'";
      if ($consulta = $this->conexion->conexion->query($sql)) {
        return 1;
      }else{
        return 0;
      }

}

function listar_alumnos(){
 $sql=  " select idalumno, apellidop, alumnonombre,gradonombre, sexo,codigo,stadoalumno  from alumno

   inner join  grado on grado.idgrado = alumno.grado";
            $arreglo = array();
            if ($consulta = $this->conexion->conexion->query($sql)) {
                while ($consulta_VU = mysqli_fetch_assoc($consulta)) {

                    $arreglo["data"][]=$consulta_VU;

                }
                return $arreglo;
                $this->conexion->cerrar();
            }

}


function Registrar_Matricula($apellp,$nombre,$fechaN, $dni,$telf,$pago, $codi,$grado,$sexo,$fechaR, $fechmas,$direccion,$contra){

$sql = "insert into alumno (apellidop, alumnonombre, fnacimiento, dni, telefono, codigo, grado, sexo,fechaRegisto,fechaUpdate,direccion,contrasena,alumno_foto)

  values ('$apellp','$nombre','$fechaN', '$dni','$telf', '$codi','$grado','$sexo','$fechaR','$fechmas','$direccion','$contra','imagenes/images.png')";

    if ($consulta = $this->conexion->conexion->query($sql)) {
              $this->Registrar_Pago($apellp,$pago,$fechaR); 
             return 1;
                
               }else{
                return 0;
              }

}

 function Registrar_Pago($apellp,$pago,$fechaR){

     $sql="insert into registropago (alumnonombre, montopago,description, fechasPagados, fechaUpdate) values ('$apellp','$pago','MATRICULA','$fechaR', '$fechaR')";

         if ($consulta = $this->conexion->conexion->query($sql)) {
             return 1;
                
               }else{
                return 0;
              }

         }
  
 function Camb_ultimo_fech_pagp($idalum,$fechmay,$fechmas){
   $sql = "UPDATE alumno SET fechaRegisto ='$fechmay' ,fechaUpdate = '$fechmas',stadoPago ='PROCESANDO..' where idalumno ='$idalum'";
          if ($consulta = $this->conexion->conexion->query($sql)) {
             return 1;
                
               }else{
                return 0;
              }

    }



  function Listar_Pagos_Alumnos(){

     $sql =  "select idalumno, apellidop, gradonombre,fechaRegisto,fechaUpdate,stadoPago  from alumno
                   inner join  grado on grado.idgrado = alumno.grado";
            $arreglo = array();
            if ($consulta = $this->conexion->conexion->query($sql)) {
                while ($consulta_VU = mysqli_fetch_assoc($consulta)) {

                    $arreglo["data"][]=$consulta_VU;

                }
                return $arreglo;
                $this->conexion->cerrar();
            }

  }


  function Cambiar_Estado_Pago($fecha_actual){
     // UPDATE alumno   SET stadoPago = 'PAGADO'  WHERE fechaUpdate >= '2021-02-14 00:00:00';
      $acceder ="SET SQL_SAFE_UPDATES = '0'";
        $consulta = $this->conexion->conexion->query($acceder);

       $sql = "UPDATE alumno SET stadoPago = IF(MONTH(fechaUpdate)<= MONTH('$fecha_actual'),'DEUDA','PAGADO') where stadoPago ='PAGADO'";

           if ($consulta = $this->conexion->conexion->query($sql)) {
             return 1;
            
                
               }else{
                return 0;
              }
               $this->conexion->cerrar();

  }


function ExtraerAlumnosQueRealizanPagos(){
$sql=  "select idalumno, fechaRegisto, fechaUpdate from alumno";
 $arreglo = array();
 if ($consulta = $this->conexion->conexion->query($sql)) {
  while ($consulta_VU = mysqli_fetch_assoc($consulta)) {
    $arreglo[]=$consulta_VU;
  }
  return $arreglo;
  $this->conexion->cerrar();
}

}

function ActualizarEstadoPago($idalumno,$stado){

 $sql = "UPDATE alumno SET stadoPago ='$stado' where idalumno ='$idalumno' ";
          if ($consulta = $this->conexion->conexion->query($sql)) {
             return 1;
                
               }else{
                return 0;
              }

}


 
function Pagos_mensuales_Alumnos($idalum,$alumnombre,$pagovect,$vecFech){

 $sql="insert into registropago (alumnonombre, montopago,description, fechasPagados, fechaUpdate,alumno_id) values ('$alumnombre','$pagovect','PENCION','$vecFech', NOW(),'$idalum')";

         if ($consulta = $this->conexion->conexion->query($sql)) {
             return 1;
                
               }else{
                return 0;
              }


}

function listar_meses_pagados($nombAlum){

   $sql  = "select montopago, description, fechasPagados, registropago.fechaUpdate, stado from registropago
 inner join  alumno on alumno.idalumno = registropago.alumno_id
      where alumno_id='$nombAlum'";     
            $arreglo = array();
                if ($consulta = $this->conexion->conexion->query($sql)) {
                 while ($consulta_VU = mysqli_fetch_assoc($consulta)) {
                         $arreglo['data'][]=$consulta_VU;
                }
                return $arreglo;
                $this->conexion->cerrar();

               }
       }


function Modificar_Estatus_Alumno($idusuario,$estatus){
       $sql = "UPDATE alumno SET stadoalumno = '$estatus' WHERE idalumno = '$idusuario'";
      if ($consulta = $this->conexion->conexion->query($sql)) {
        return 1;
        
      }else{
        return 0;
      }
        }


     }
?>