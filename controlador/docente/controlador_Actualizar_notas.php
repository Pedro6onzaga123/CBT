
<?php
    require '../../modelo/modelo_docente.php';
    $docent = new Docente();

    $curso = htmlspecialchars($_POST['curso'],ENT_QUOTES,'UTF-8');
    $alumnoid=htmlspecialchars($_POST['alumnoid'],ENT_QUOTES,'UTF-8');
    $idnotas=htmlspecialchars($_POST['idnotas'],ENT_QUOTES,'UTF-8');

    $practica1 = htmlspecialchars($_POST['practica1'] ?? 0, ENT_QUOTES,'UTF-8');
    $practica2 = htmlspecialchars($_POST['practica2'] ?? 0, ENT_QUOTES,'UTF-8');
    $practica3 = htmlspecialchars($_POST['practica3'] ?? 0, ENT_QUOTES,'UTF-8');
    $practica4 = htmlspecialchars($_POST['practica4'] ?? 0, ENT_QUOTES,'UTF-8');

    $trabajo1 = htmlspecialchars($_POST['trabajo1'] ?? 0, ENT_QUOTES,'UTF-8');
    $trabajo2 = htmlspecialchars($_POST['trabajo2'] ?? 0, ENT_QUOTES,'UTF-8');
    $trabajo3 = htmlspecialchars($_POST['trabajo3'] ?? 0, ENT_QUOTES,'UTF-8');
    $trabajo4 = htmlspecialchars($_POST['trabajo4'] ?? 0, ENT_QUOTES,'UTF-8');

    $parcial1 = htmlspecialchars($_POST['parcial1'] ?? 0, ENT_QUOTES,'UTF-8');
    $parcial2 = htmlspecialchars($_POST['parcial2'] ?? 0, ENT_QUOTES,'UTF-8');
    $parcial3 = htmlspecialchars($_POST['parcial3'] ?? 0, ENT_QUOTES,'UTF-8');
    $parcial4 = htmlspecialchars($_POST['parcial4'] ?? 0, ENT_QUOTES,'UTF-8');

    $exsamen1 = htmlspecialchars($_POST['exsamen1'] ?? 0, ENT_QUOTES,'UTF-8');
    $exsamen2 = htmlspecialchars($_POST['exsamen2'] ?? 0, ENT_QUOTES,'UTF-8');

   $consulta = $docent->Actualizar_Notas($idnotas,$curso,$alumnoid,$practica3,$practica4,$trabajo3,$trabajo4,$parcial3,$parcial4, $exsamen1,$exsamen2);
 echo $consulta;

     /*$consulta = $docent->Registrar_Notas($curso,$alumnoid,$practica1,$practica2,$trabajo1,$trabajo2,$parcial1,$parcial2,$exsamen1);
    echo $consulta;
*/
?>