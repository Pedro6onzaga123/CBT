<?php
    class Modelo_Usuario{
        private $conexion;
        function __construct(){
            require_once 'modelo_conexion.php';
            $this->conexion = new conexion();
            $this->conexion->conectar();
        }

         function VerificarUsuario($usuario,$contra){
               $sql = "select usu_id,usu_nombre,usu_contrasena,rol_nombre,usu_estatus from usuarios
                      inner join  rol on rol.rol_id = usuarios.rol_id
                where usu_nombre='$usuario'";
            $arreglo = array();
            if ($consulta = $this->conexion->conexion->query($sql)) {
                while ($consulta_VU = mysqli_fetch_array($consulta)) {
                    if(password_verify($contra, $consulta_VU["usu_contrasena"]))
                    {
                        $arreglo[] = $consulta_VU;
                    }
                }
                return $arreglo;
                $this->conexion->cerrar();
            }
        }

          function listar_usuario(){
           $sql=  "select usu_id,usu_nombre,usu_apellido,usu_sexo,rol_nombre,usu_estatus from usuarios inner join  rol on usuarios.rol_id= rol.rol_id";

            $arreglo = array();
            if ($consulta = $this->conexion->conexion->query($sql)) {
                while ($consulta_VU = mysqli_fetch_assoc($consulta)) {

                    $arreglo["data"][]=$consulta_VU;

                }
                return $arreglo;
                $this->conexion->cerrar();
            }
        }



        function listar_combo_rol(){
             $sql = "SELECT rol_id,rol_nombre FROM rol";
            $arreglo = array();
            if ($consulta = $this->conexion->conexion->query($sql)) {
                while ($consulta_VU = mysqli_fetch_array($consulta)) {
                        $arreglo[] = $consulta_VU;
                }
                return $arreglo;
                $this->conexion->cerrar();
            }
        }
		

		function Modificar_Estatus_Usuario($idusuario,$estatus){
       $sql = "UPDATE usuarios SET usu_estatus = '$estatus' WHERE usu_id = '$idusuario'";
			if ($consulta = $this->conexion->conexion->query($sql)) {
				return 1;
				
			}else{
				return 0;
			}
        }



      function CambiarContra_Usuario($usuid,$contranew,$newfoto){
             $sql = "UPDATE usuarios SET usu_contrasena = '$contranew',usu_foto='$newfoto' WHERE usu_id = '$usuid'";
            if ($consulta = $this->conexion->conexion->query($sql)) {      
              return 1;
              
            }else{
              return 0;
            }
      }

      function CambiarContra_Usuario_sinfoto($usuid,$contranew,$fotoActual){
             $sql = "UPDATE usuarios SET usu_contrasena = '$contranew',usu_foto='$fotoActual' WHERE usu_id = '$usuid'";
            if ($consulta = $this->conexion->conexion->query($sql)) {      
              return 1;
              
            }else{
              return 0;
            }
      }
        
        
         

        function Registrar_Usuario($usuario,$contra,$sexo,$rol,$usuapell){
             $sql = "INSERT INTO usuarios(usu_nombre,usu_contrasena,usu_sexo,rol_id,usu_apellido,usu_foto) VALUES ('$usuario','$contra','$sexo','$rol','$usuapell','imagenes/images.png')";
     
            if ($consulta = $this->conexion->conexion->query($sql)) {

           return 1;
                
            }else{
                return 0;
            }
     }
     


      function Datos_Usuario_eliminar( $idusuario){
            $sql=   "DELETE FROM usuarios WHERE usu_id = '$idusuario'";

      if ($consulta = $this->conexion->conexion->query($sql)) {
        return 1;
        
      }else{
        return 0;
      }
        }

         function Modificar_Datos_Usuario( $idusuario,$nombre,$apellido,$sexo,$rol){
             $sql = "UPDATE usuarios SET usu_nombre='$nombre', usu_sexo = '$sexo',rol_id = '$rol',usu_apellido='$apellido' WHERE usu_id = '$idusuario'";
            if ($consulta = $this->conexion->conexion->query($sql)) {
                return 1; 
            }else{
                return 0;
            }
        }


          function Extraer_contracena($usu_id){
               $sql = "SELECT usu_id,usu_contrasena,usu_foto FROM usuarios WHERE usu_id='$usu_id'";
            $arreglo = array();
            if ($consulta = $this->conexion->conexion->query($sql)) {
                while ($consulta_VU = mysqli_fetch_array($consulta)) {
                   
                        $arreglo[] = $consulta_VU;
                    
                }
                return $arreglo;
                $this->conexion->cerrar();
            }
        }




    }
?>