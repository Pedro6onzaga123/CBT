<?php
    require '../../modelo/modelo_Asistencia.php';
    $asistensia = new Asistensia;

    session_start();

if (!empty($_SESSION['S_IDUSUARIO'])) {
     $idcurso = htmlspecialchars($_POST['idcurso'],ENT_QUOTES,'UTF-8');
      $idgrado = htmlspecialchars($_POST['idgrado'],ENT_QUOTES,'UTF-8');


    $consulta = $asistensia->listar_Alumnos_Matriculados($idcurso, $idgrado);
    if($consulta){
        echo json_encode($consulta);
    }else{
        
        echo 0;
    }
}
else{
    echo 0;
}

?>