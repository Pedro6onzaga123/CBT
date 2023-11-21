<?php
   require '../../modelo/modelo_administrador.php';
    $MU = new Modelo_Administrador();

    $apellp = htmlspecialchars($_POST['apellp'],ENT_QUOTES,'UTF-8');
    $nombre = htmlspecialchars($_POST['nomb'],ENT_QUOTES,'UTF-8');
    $fechaN = htmlspecialchars($_POST['fechaN'],ENT_QUOTES,'UTF-8');
    $dni = htmlspecialchars($_POST['dni'],ENT_QUOTES,'UTF-8');
    $telf = htmlspecialchars($_POST['telf'],ENT_QUOTES,'UTF-8');
     $pago = htmlspecialchars($_POST['pago'],ENT_QUOTES,'UTF-8');
    $codi = htmlspecialchars($_POST['codi'],ENT_QUOTES,'UTF-8');
    $grado = htmlspecialchars($_POST['grad'],ENT_QUOTES,'UTF-8');
    $sexo = htmlspecialchars($_POST['sex'],ENT_QUOTES,'UTF-8');
    $fechaR = htmlspecialchars($_POST['fechaR'],ENT_QUOTES,'UTF-8');
    $contra = password_hash($_POST['contra'],PASSWORD_DEFAULT,['cost'=>10]);
    $direccion = htmlspecialchars($_POST['direccion'],ENT_QUOTES,'UTF-8');

     $fecha_actual = date('Y-m-d H:i:s');

    $fechmas = date('Y-m-d H:i:s',strtotime($fecha_actual."+ 1 month"));
   
   $consulta = $MU->Registrar_Matricula($apellp,$nombre,$fechaN, $dni,$telf,$pago, $codi,$grado,$sexo,$fechaR,$fechmas,$direccion,$contra);
    echo  $consulta;

?>