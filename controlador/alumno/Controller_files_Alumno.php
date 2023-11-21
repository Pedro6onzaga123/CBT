<?php
    require '../../modelo/modelo_alumno.php';
    $alumno = new Alumno();
   
       session_start();

if (!empty($_SESSION['S_IDUSUARIO'])) {

    $idgrado = $_SESSION['S_GRADO'];



    $consulta = $alumno->listar_Archivos_Grado($idgrado);
    if($consulta){
        echo json_encode($consulta);
    }else{
        echo '{
            "sEcho": 1,
            "iTotalRecords": "0",
            "iTotalDisplayRecords": "0",
            "aaData": []
        }';
    }

}else{
     echo '{
            "sEcho": 1,
            "iTotalRecords": "0",
            "iTotalDisplayRecords": "0",
            "aaData": []
        }';
}

?>



