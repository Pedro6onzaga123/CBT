
<?php
     require '../../modelo/modelo_horario.php';

   $horario = new Horario();
    $idhorario = htmlspecialchars($_POST['idtd'],ENT_QUOTES,'UTF-8');

     $xidhorario = substr($idhorario, -2);

     $respuesta = $horario->eliminar($xidhorario);

    //$consulta = $MU->Datos_Usuario_eliminar( $idusuario);
    echo $respuesta;

?>

