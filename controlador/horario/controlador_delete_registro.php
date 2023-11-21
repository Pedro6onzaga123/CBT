<?php
     require '../../modelo/modelo_horario.php';

   $horario = new Horario();
    $codigo = htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8');


     $respuesta = $horario->delete_registro($codigo);
    echo $respuesta;

?>
