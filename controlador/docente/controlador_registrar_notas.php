<?php
    require '../../modelo/modelo_docente.php';
    $docent = new Docente();

   $gradoID = htmlspecialchars($_POST['gradoID'],ENT_QUOTES,'UTF-8');
    $curso = htmlspecialchars($_POST['curso'],ENT_QUOTES,'UTF-8');
    $alumnoid=htmlspecialchars($_POST['alumnoid'],ENT_QUOTES,'UTF-8');

    $practica1 = htmlspecialchars($_POST['practica1'],ENT_QUOTES,'UTF-8');
    $practica2 = htmlspecialchars($_POST['practica2'],ENT_QUOTES,'UTF-8');
    $practica3 = htmlspecialchars($_POST['practica3'] ?? 0, ENT_QUOTES, 'UTF-8');
    $practica4 = htmlspecialchars($_POST['practica4'] ?? 0, ENT_QUOTES, 'UTF-8');


    $trabajo1 = htmlspecialchars($_POST['trabajo1'],ENT_QUOTES,'UTF-8');
    $trabajo2 = htmlspecialchars($_POST['trabajo2'],ENT_QUOTES,'UTF-8');

    $trabajo3 = htmlspecialchars( $_POST['trabajo3'] ?? 0,ENT_QUOTES,'UTF-8');
    $trabajo4 = htmlspecialchars( $_POST['trabajo4'] ?? 0, ENT_QUOTES,'UTF-8');

    $parcial1 = htmlspecialchars($_POST['parcial1'],ENT_QUOTES,'UTF-8');
    $parcial2 = htmlspecialchars($_POST['parcial2'],ENT_QUOTES,'UTF-8');
    $parcial3 = htmlspecialchars( $_POST['parcial3'] ?? 0,ENT_QUOTES,'UTF-8');
    $parcial4 = htmlspecialchars( $_POST['parcial4'] ?? 0,ENT_QUOTES,'UTF-8');

    $exsamen1 = htmlspecialchars($_POST['exsamen1'],ENT_QUOTES,'UTF-8');
    $exsamen2 = htmlspecialchars( $_POST['exsamen2'] ?? 0,ENT_QUOTES,'UTF-8'); 

   
  // $result = $docent->Recetear_Tabla_Notas($gradoID , $curso, $alumnoid);


   $consulta = $docent->Registrar_Notas($gradoID , $curso, $alumnoid, $practica1 ,$practica2,$practica3,$practica4, $trabajo1 , $trabajo2 , $trabajo3 , $trabajo4 , $parcial1 , $parcial2 , $parcial3 , $parcial4 , $exsamen1 ,$exsamen2);


 echo $consulta;
    /* $consulta = $docent->Registrar_Notas($gradoID,$curso,$alumnoid,$practica1,$practica2,$trabajo1,$trabajo2,$parcial1,$parcial2,$exsamen1);
    echo $consulta;*/

?>