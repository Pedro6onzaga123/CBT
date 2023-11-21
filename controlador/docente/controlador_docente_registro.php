<?php
    require '../../modelo/modelo_docente.php';
    $docent = new Docente();

    $nom = htmlspecialchars($_POST['nombre'],ENT_QUOTES,'UTF-8');
    $usuapell=htmlspecialchars($_POST['apellido'],ENT_QUOTES,'UTF-8');
    $contra = password_hash($_POST['contra1'],PASSWORD_DEFAULT,['cost'=>10]);
    $sexo = htmlspecialchars($_POST['sexo'],ENT_QUOTES,'UTF-8');
    $tipo = htmlspecialchars($_POST['tipo'],ENT_QUOTES,'UTF-8');
    $dni = htmlspecialchars($_POST['dni'],ENT_QUOTES,'UTF-8');
    $consulta = $docent->Registrar_Docente($nom,$usuapell,$contra,$sexo,$tipo,$dni);
    echo $consulta;

?>
