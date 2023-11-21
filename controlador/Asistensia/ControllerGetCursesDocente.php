

<?php
    require '../../modelo/modelo_Asistencia.php';
    $asistensia = new Asistensia;

    session_start();

if (!empty($_SESSION['S_IDUSUARIO'])) {
     $idprofe= $_SESSION['S_IDUSUARIO'];


    $consulta = $asistensia->listar_gradosCursosdocente($idprofe);
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