<?php
     require '../../modelo/modelo_horario.php';

   $horario = new Horario();
   $numer=1;

   $selecionado = htmlspecialchars($_POST['horarios'],ENT_QUOTES,'UTF-8');
$data =(isset($_POST['horarios']))? json_decode($_POST['horarios'],true): array("error"=>"no se pudo completar el registro");






if (!empty($data)) {
	# code...


//VERIFICAR SI YA EXISTE HORARIO PARA EL GRADO SELECIONADO
 $consulta = $horario->Verificar_Existe($data[0]['idgrado']);
 if ($consulta>0) {
 	echo 100;return;
 }else{
 	
 }

   foreach ($data as $value) {
   	$tdId  = substr($value['idtd'] , -2);

   	 $resp = $horario->Registar_horario($tdId, $value['hora'], $value['idcurso'],$value['dia'],$value['idgrado']);

/*$resquest = $horario->Registar_horas_Crusos($tdId, $value['hora'], $value['idcurso'], $value['dia'],$value['idgrado'],$value['idturno'],$value['idnivel'],$value['idseccion'],$value['idjornada'],$value['idyear'],$idhorario);*/

   }

echo $resp;
}else{
	echo 500;
}



?>