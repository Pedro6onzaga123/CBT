<?php
    require '../../modelo/modelo_curso.php';
    $curso = new Curso();

     $consulta = $curso->combo_cursos_libre();
    echo json_encode($consulta);
    

?>