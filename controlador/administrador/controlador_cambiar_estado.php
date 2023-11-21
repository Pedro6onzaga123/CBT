

<?php
     require '../../modelo/modelo_administrador.php';
    $MU = new Modelo_Administrador();

$consulta = $MU->ExtraerAlumnosQueRealizanPagos();


if($consulta){
   date_default_timezone_set('America/Lima');
   $FechaActual=date('Y-m-d');
   
   foreach ($consulta as $value) {

    if ($value['fechaUpdate'] <= $FechaActual) {
     $stado= 'DEUDA';
     $ctualizar = $MU-> ActualizarEstadoPago($value['idalumno'],$stado);
     
 }else{
   $stado= 'PAGADO';
   $ctualizar = $MU-> ActualizarEstadoPago($value['idalumno'], $stado);

}
}

echo $ctualizar;
}else{
 
}





 //  $fecha_actual = date('Y-m-d H:i:s');
      // $fecha_actual = date('2022-01-10 05:10:25');

  //  $consulta = $MU->Cambiar_Estado_Pago($fecha_actual);
  //  echo $consulta;
?>