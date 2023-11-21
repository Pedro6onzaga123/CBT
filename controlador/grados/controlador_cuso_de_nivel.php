<?php
    require '../../modelo/modelo_docente.php';

    $docent = new Docente;
    $idnivel = htmlspecialchars($_POST['idnivel'],ENT_QUOTES,'UTF-8');
   
     $consulta = $docent->Traer_curso($idnivel);

 
    echo json_encode($consulta);
    /*
    if(!empty($consulta))
     foreach ($consulta as  $value) {

     	 $cursos = $docent->Extraer_Cursos_Estado_Pendiente($cursos, $value['idcurso']);
     	# code...
     }
     */

?>