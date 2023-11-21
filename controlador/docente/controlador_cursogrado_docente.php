<?php
    require '../../modelo/modelo_docente.php';
    $docent = new Docente();
    $iddocente = htmlspecialchars($_POST['iddocente'],ENT_QUOTES,'UTF-8');
     $canti = htmlspecialchars($_POST['cantidad'],ENT_QUOTES,'UTF-8');
      $materia = htmlspecialchars($_POST['vect'],ENT_QUOTES,'UTF-8');
      $Semest= htmlspecialchars($_POST['profSemestGrad'],ENT_QUOTES,'UTF-8');
     
       $vectoC= explode(",",$canti );
       $arreglo= explode(",",$materia );//separanso vector
      
        //var_dump($vectorC);
       for ($i=0; $i <count($arreglo) ; $i++) { 
        if ($arreglo[$i] !='') {

           $consulta = $docent->Verificar_YaAsignado($iddocente,$vectoC[$i],$arreglo[$i]);

           if( $consulta>0){

           }else{
               $consulta = $docent->Docente_Asignado($iddocente,$vectoC[$i],$arreglo[$i],$Semest);
           }



           
      }
     }
      
      //CAMBIAR DE ESTADO A CADA CURSO ASIGNADO
       for ($i=0; $i <count($vectoC) ; $i++) { 
        $docent->Cambiar_estado_curso($arreglo[$i]);
      
        }

     echo $consulta;

?>

