<?php
    require '../../modelo/modelo_docente.php';
    $docent = new Docente();

    $idprofe = htmlspecialchars($_POST['id_usu'],ENT_QUOTES,'UTF-8');
  
    $consulta = $docent->Extraer_contracenaDocent($idprofe);
    $data = json_encode($consulta);
    if(count($consulta)>0){
        echo $data;
    }else{
        echo 0;
    }

?>