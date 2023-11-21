<?php
    class Alumno{
        private $conexion;
        function __construct(){
            require_once 'modelo_conexion.php';
            $this->conexion = new conexion();
            $this->conexion->conectar();
        }



        function VerificarAlumno($usuario,$contra){/*
       $sql = "select idalumno,alumnonombre,contrasena,rolalumno,stadoalumno from alumno
                where alumnonombre ='$usuario'";*/
                 $sql = "select idalumno,alumnonombre,grado,contrasena,rolalumno,stadoalumno from alumno
                where alumnonombre ='$usuario'";

            $arreglo = array();
            if ($consulta = $this->conexion->conexion->query($sql)) {
                while ($consulta_VU = mysqli_fetch_array($consulta)) {
                    if(password_verify($contra, $consulta_VU["contrasena"]))
                    {
                        $arreglo[] = $consulta_VU;
                    }
                }
                return $arreglo;
                $this->conexion->cerrar();
            }


    }

function Extraer_contra_Alum( $idalum){
 $sql = "SELECT idalumno,contrasena,alumno_foto FROM alumno WHERE idalumno='$idalum'";
            $arreglo = array();
            if ($consulta = $this->conexion->conexion->query($sql)) {
                while ($consulta_VU = mysqli_fetch_array($consulta)) {
                   
                        $arreglo[] = $consulta_VU;
                    
                }
                return $arreglo;
                $this->conexion->cerrar();
            }

}

function CambiarContra_Alum($usuid,$contranew,$newfoto){
             $sql = "UPDATE alumno SET contrasena = '$contranew',alumno_foto='$newfoto' WHERE idalumno = '$usuid'";
            if ($consulta = $this->conexion->conexion->query($sql)) {      
              return 1;
              
            }else{
              return 0;
            }
      }

      function CambiarContra_Alum_sinfoto($usuid,$contranew,$fotoActual){
             $sql = "UPDATE alumno SET contrasena = '$contranew',alumno_foto='$fotoActual' WHERE idalumno = '$usuid'";
            if ($consulta = $this->conexion->conexion->query($sql)) {      
              return 1;
              
            }else{
              return 0;
            }
      }

function traer_grado_alumno( $idalum){
     $sql = "select idgrado, gradonombre from alumno 
     inner join  grado on grado.idgrado = alumno.grado
      WHERE idalumno='$idalum'";
      $arreglo = array();
      if ($consulta = $this->conexion->conexion->query($sql)) {
        while ($consulta_VU = mysqli_fetch_array($consulta)) {
                        $arreglo[] = $consulta_VU;
        }
        return $arreglo;
        $this->conexion->cerrar();
      }


}

function listar_Archivos_Grado($idgrado){
 $sql = "SELECT idfile, nombrearchivo, extension, fechaCreate FROM files WHERE gradoid_file='$idgrado'";
            $arreglo = array();
            if ($consulta = $this->conexion->conexion->query($sql)) {
                while ($consulta_VU = mysqli_fetch_array($consulta)) {
                   
                       $arreglo['data'][]=$consulta_VU;
                    
                }
                return $arreglo;
                $this->conexion->cerrar();
            }

}



    function listar_cursosAlum($idGrado){
    $sql  = "select idcurso, nonbrecurso, stadodocent  from grado_curso
            inner join  curso on curso.idcurso = grado_curso.curso_id
            where grado_id ='$idGrado'";     
            $arreglo = array();
                if ($consulta = $this->conexion->conexion->query($sql)) {
                 while ($consulta_VU = mysqli_fetch_assoc($consulta)) {
                         $arreglo['data'][]=$consulta_VU;
                }
                return $arreglo;
                $this->conexion->cerrar();

               }


    }
function listar_NotasCur($curso,$alum){
$sql = "SELECT practica1, practica2, practica3, practica4, trabajo1, trabajo2, trabajo3, trabajo4, parcial1, parcial2, parcial3, parcial4, exsamen1, exsamen2 FROM notas where alumnoid='$alum' and curso='$curso' ";

      $arreglo = array();
      if ($consulta = $this->conexion->conexion->query($sql)) {
        while ($consulta_VU = mysqli_fetch_array($consulta)) {
                        $arreglo['data'][] = $consulta_VU;
        }
        return $arreglo;
        $this->conexion->cerrar();
      }
}

function listar_aulas_grado($idgrado){
$sql  = "select idaula, nombreaula, piso, numero, aforro, seccion from grado
            inner join  aula on aula.idaula = grado.aula_id
            where idgrado ='$idgrado'";     
            $arreglo = array();
                if ($consulta = $this->conexion->conexion->query($sql)) {
                 while ($consulta_VU = mysqli_fetch_assoc($consulta)) {
                         $arreglo['data'][]=$consulta_VU;
                }
                return $arreglo;
                $this->conexion->cerrar();

               }


}

//FUNCION DE HORARIOS

 function ListarHoras_Alumno() {

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

 function mostratarHorario_Alumno($dia,$hora,$idgrado ){

    $sql="select idhorariocurso,nonbrecurso from horario_curso 
             inner join curso  on curso.idcurso = horario_curso.idcurso
             WHERE idhora = '$hora' AND dia = '$dia' AND gradoid='$idgrado '";
            $arreglo = array();
            if ($consulta = $this->conexion->conexion->query($sql)) {
                while ($consulta_VU = mysqli_fetch_assoc($consulta)) {

                    $arreglo[]=$consulta_VU;

                }
                return $arreglo;
                $this->conexion->cerrar();
            }
            
           }
  function listar_meses_pagadosAlum($nombAlum){

   $sql  = "select montopago, description, fechasPagados, fechaUpdate, stado from registropago
      where alumnonombre='$nombAlum'";     
            $arreglo = array();
                if ($consulta = $this->conexion->conexion->query($sql)) {
                 while ($consulta_VU = mysqli_fetch_assoc($consulta)) {
                         $arreglo['data'][]=$consulta_VU;
                }
                return $arreglo;
                $this->conexion->cerrar();

               }
       }
    

      function Pagos_Alumnos_Estado($idalum){

     $sql =  "select apellidop,alumnonombre,gradonombre,fechaRegisto,fechaUpdate,stadoPago  from alumno
                   inner join  grado on grado.idgrado = alumno.grado
                     where idalumno='$idalum'
                   ";
            $arreglo = array();
            if ($consulta = $this->conexion->conexion->query($sql)) {
                while ($consulta_VU = mysqli_fetch_assoc($consulta)) {

                    $arreglo[]=$consulta_VU;

                }
                return $arreglo;
                $this->conexion->cerrar();
            }

  }

  function listar_alumnos_Reporte(){

    $sql=  " select idalumno, apellidop, alumnonombre,dni, telefono,gradonombre, sexo,codigo,fechaRegisto,stadoalumno  from alumno
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


  
function listar_Files_Grado_alumno($idgrado,$alumno,$idfolder){
 $sql  = "SELECT idfile, nombrearchivo, fechaCreate FROM files WHERE idfolder='$idfolder' and gradoid_file='$idgrado' ";     
            $arreglo = array();
           if ($consulta = $this->conexion->conexion->query($sql)) {
           while ($consulta_VU = mysqli_fetch_assoc($consulta)) {
                   $arreglo[]=$consulta_VU;
          }
          return $arreglo;
          $this->conexion->cerrar();
          }
}


  function listar_alumnos_Reporte_fecha($finicio, $fFinal){

    $sql=  " select idalumno, apellidop, alumnonombre,dni, telefono,gradonombre, sexo,codigo,fechaRegisto,stadoalumno  from alumno
          inner join  grado on grado.idgrado = alumno.grado   WHERE fechaRegisto BETWEEN '$finicio'and '$fFinal'";
            $arreglo = array();
            if ($consulta = $this->conexion->conexion->query($sql)) {
                while ($consulta_VU = mysqli_fetch_assoc($consulta)) {

                    $arreglo["data"][]=$consulta_VU;

                }
                return $arreglo;
                $this->conexion->cerrar();
            }
  }


    }
?>
