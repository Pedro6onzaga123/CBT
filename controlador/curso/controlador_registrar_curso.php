<?php
  require '../../modelo/modelo_curso.php';

    $curso = new Curso();
    $codigocur = htmlspecialchars($_POST['codigocur'],ENT_QUOTES,'UTF-8');
    $nombre = htmlspecialchars($_POST['nombre'],ENT_QUOTES,'UTF-8');
    $credito = htmlspecialchars($_POST['cre'],ENT_QUOTES,'UTF-8');
    $tipo = htmlspecialchars($_POST['tipo'],ENT_QUOTES,'UTF-8');
   $consulta = $curso->Registrar_Curso($codigocur,$nombre,$credito,$tipo);
    echo $consulta;

?>