<?php
    require '../../modelo/modelo_grado.php';
    $grado = new Grado();

    $idgrado = htmlspecialchars($_POST['idgrado'],ENT_QUOTES,'UTF-8');
     $semestre = htmlspecialchars($_POST['semestre'],ENT_QUOTES,'UTF-8');
      $idcursos = htmlspecialchars($_POST['vect'],ENT_QUOTES,'UTF-8');
     
      
       $arreglo= explode(",",$idcursos );//separanso vector
        //var_dump($vectorC);
       for ($i=0; $i <count($arreglo) ; $i++) { 

         if ($arreglo[$i] !='') {

      $consulta = $grado->Registro_Curso_Grado($idgrado,$semestre,$arreglo[$i]);
    }
      
     }
      
      //CAMBIAR ESTADO DE CADA CURSO 
      for ($i=0; $i <count($arreglo) ; $i++) { 
      $grado->Cambiar_estado_curso($arreglo[$i]);
      
     }

     echo $consulta;

?>