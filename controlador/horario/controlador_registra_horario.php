<?php
    require '../../modelo/modelo_horario.php';

$horario = new Horario();

    $codigo = htmlspecialchars($_POST['idaleat'],ENT_QUOTES,'UTF-8');
    $idhorario = htmlspecialchars($_POST['idtd'],ENT_QUOTES,'UTF-8');
    $idhora = htmlspecialchars($_POST['hora'],ENT_QUOTES,'UTF-8');
    $dia = htmlspecialchars($_POST['dia'],ENT_QUOTES,'UTF-8');
    $idcurso = htmlspecialchars($_POST['curso'],ENT_QUOTES,'UTF-8');
     $idgradoH = htmlspecialchars($_POST['idgradoH'],ENT_QUOTES,'UTF-8');
    

 $xidhorario = substr($idhorario, -2);


 $resp = $horario->Registar_horario($codigo,$xidhorario, $idhora, $idcurso, $dia,$idgradoH);
echo  $resp;

//echo json_encode($resp);
    

?>