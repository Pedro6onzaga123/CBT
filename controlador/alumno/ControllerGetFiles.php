<?php
    require '../../modelo/modelo_alumno.php';
    $alum = new Alumno();

     $idfolder = htmlspecialchars($_POST['idfolder'],ENT_QUOTES,'UTF-8');
   
       session_start();

if (!empty($_SESSION['S_IDUSUARIO'])) {

    $idgrado = $_SESSION['S_GRADO'];
    $alumno =$_SESSION['S_IDUSUARIO'];



    $consulta = $alum->listar_Files_Grado_alumno($idgrado,$alumno,$idfolder);
    
        echo json_encode($consulta);
    

}else{
    echo 500;
}

?>