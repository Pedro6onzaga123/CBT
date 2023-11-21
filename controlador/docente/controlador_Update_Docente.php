<?php
    require '../../modelo/modelo_docente.php';
    $docent = new Docente();


    $iddocente = htmlspecialchars($_POST['iddocent'],ENT_QUOTES,'UTF-8');
    $nomdoce   = htmlspecialchars($_POST['nomdocent'],ENT_QUOTES,'UTF-8');
    $doctapell = htmlspecialchars($_POST['appdocent'],ENT_QUOTES,'UTF-8');
    $statusdoct = htmlspecialchars($_POST['estdocent'],ENT_QUOTES,'UTF-8');
    $sexodocet  = htmlspecialchars($_POST['sexdocent'],ENT_QUOTES,'UTF-8');
    $tipodocet  = htmlspecialchars($_POST['tipdocent'],ENT_QUOTES,'UTF-8');
     
      $consulta = $docent->Update_Docente($iddocente,$nomdoce,$doctapell,$statusdoct,$sexodocet,$tipodocet);
    
       echo $consulta;

?>

