<?php
    require '../../modelo/modelo_docente.php';
    $docent = new Docente();

    $usuario = htmlspecialchars($_POST['user'],ENT_QUOTES,'UTF-8');
    $contra =htmlspecialchars($_POST['pass'],ENT_QUOTES,'UTF-8');
    
   $consulta = $docent->VerificarDocente($usuario,$contra);
    $data = json_encode($consulta);
    if(count($consulta)>0){
        echo $data;
    }else{
        echo 0;
    }
?>
