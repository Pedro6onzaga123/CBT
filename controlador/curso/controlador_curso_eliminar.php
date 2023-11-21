<?php
   require '../../modelo/modelo_curso.php';

    $curso = new Curso();
    $idcurso = htmlspecialchars($_POST['idecurso'],ENT_QUOTES,'UTF-8');
   
     $consulta = $curso->Eliminar_Curso($idcurso);
    echo $consulta;

?>