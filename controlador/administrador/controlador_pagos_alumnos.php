<?php
   require '../../modelo/modelo_administrador.php';
    $MU = new Modelo_Administrador();

    $idalum = htmlspecialchars($_POST['alum'],ENT_QUOTES,'UTF-8');
    $alumnombre = htmlspecialchars($_POST['alumnomb'],ENT_QUOTES,'UTF-8');
    $fechas = htmlspecialchars($_POST['arrayF'],ENT_QUOTES,'UTF-8');
    $pagos = htmlspecialchars($_POST['arrayP'],ENT_QUOTES,'UTF-8');
     $fechmay = htmlspecialchars($_POST['fechmay'],ENT_QUOTES,'UTF-8');

       $vecFech= explode(",",$fechas );
       $pagovect= explode(",",$pagos );//separanso vector

       for ($i=0; $i <count($pagovect) ; $i++) { 
       if ($pagovect[$i] !='') {
      $consulta = $MU->Pagos_mensuales_Alumnos($idalum,$alumnombre,$pagovect[$i],$vecFech[$i]);
       }
     }
      $fechmas = date('Y-m-d H:i:s',strtotime($fechmay."+ 1 month"));

      $MU->Camb_ultimo_fech_pagp($idalum,$fechmay, $fechmas);

    echo $consulta;

?>