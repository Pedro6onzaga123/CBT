<?php
   /* require '../../modelo/modelo_grado.php';
    $grado = new Grado();

    $id = htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8');

    $consulta =  $grado->Ver_Grado_Curso($id);
    
       echo json_encode($consulta);*/


require '../../modelo/modelo_grado.php';
    $grado = new Grado();
    $id = htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8');
     $consulta = $grado->Ver_Grado_Curso($id);
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

?>