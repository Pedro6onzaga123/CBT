<?php
    require '../../modelo/modelo_Asistencia.php';
    $alum = new Asistensia();
   
       session_start();

if (!empty($_SESSION['S_IDUSUARIO'])) {

    $idgrado = $_SESSION['S_GRADO'];
    $alumno =$_SESSION['S_IDUSUARIO'];



    $consulta = $alum->listar_Asistencias_Grado($idgrado,$alumno);
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
