

<?php
    require '../../modelo/modelo_grado.php';
    $grado = new Grado();
    $idgrado = htmlspecialchars($_POST['idgrado'],ENT_QUOTES,'UTF-8');
   
     $consulta =  $grado->Eliminar_Grado($idgrado);
    echo json_encode($consulta);

?>



