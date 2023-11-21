
<?php
    require '../../modelo/modelo_curso.php';
    $curso = new Curso();
     $consulta = $curso->Listar_Curso();
    if($consulta){
        echo json_encode($consulta);
    }else{
        echo '{
            "sEcho": 1,
            "iTotalRecords": "0",
            "iTotalDisplayRecords": "0",
            "aaData": []
        }';
    }

?>
