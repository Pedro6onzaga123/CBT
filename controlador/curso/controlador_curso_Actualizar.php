
<?php
  require '../../modelo/modelo_curso.php';

    $curso = new Curso();
    $idcurso = htmlspecialchars($_POST['idcurso'],ENT_QUOTES,'UTF-8');
    $codigcurso = htmlspecialchars($_POST['codigcurso'],ENT_QUOTES,'UTF-8');
    $nombre = htmlspecialchars($_POST['nombcurso'],ENT_QUOTES,'UTF-8');
    $credito = htmlspecialchars($_POST['creditcurso'],ENT_QUOTES,'UTF-8');
    $tipo = htmlspecialchars($_POST['tipoedit'],ENT_QUOTES,'UTF-8');
   $consulta = $curso->Update_Curso($idcurso,$codigcurso,$nombre,$credito,$tipo);
    echo $consulta;

?>