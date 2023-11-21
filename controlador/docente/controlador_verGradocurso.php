<?php
   /* require '../../modelo/modelo_docente.php';
    $docent = new Docente();
    $iddocente = htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8');
     
      $consulta = $docent->Ver_CargosAsignados($iddocente);
    
       echo json_encode($consulta);*/

       require '../../modelo/modelo_docente.php';
    $docent = new Docente();
    $iddocente = htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8');
     
      $consulta = $docent->Ver_CargosAsignados($iddocente);
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