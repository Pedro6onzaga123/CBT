<?php
    require '../../modelo/modelo_docente.php';
    $docent = new Docente();
     $idcurso = htmlspecialchars($_POST['idcapturado'],ENT_QUOTES,'UTF-8');
     $consulta =  $docent ->Quitar_cursoDocente($idcurso);
    echo json_encode($consulta);
    

?>