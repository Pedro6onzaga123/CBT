
<?php
    require '../../modelo/modelo_grado.php';
    $grado = new Grado();
    $idcurso = htmlspecialchars($_POST['idcapturado'],ENT_QUOTES,'UTF-8');

    $consulta =  $grado->extrae_Curso($idcurso);
///QUITAR EL CURSO DEL GRADO SI EL DOCENTE NO ESTA DICTANDO
    if ($consulta[0]["stadodocent"]=="DICTANDO") {
    	
    	echo 0;
    }else{
     $consulta =  $grado->Quitar_curso($idcurso);
    echo $consulta;
    }

    

?>