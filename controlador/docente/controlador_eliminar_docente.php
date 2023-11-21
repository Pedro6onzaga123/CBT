<?php
    require '../../modelo/modelo_docente.php';
    $docent = new Docente();

    $idprofe = htmlspecialchars($_POST['idprofe'],ENT_QUOTES,'UTF-8');
  
    $consulta = $docent->Eliminar_Docente($idprofe);
    echo $consulta;

?>