
<?php
    require '../../modelo/modelo_Asistencia.php';
    $asistensia = new Asistensia;

    session_start();

if (!empty($_SESSION['S_IDUSUARIO'])) {

	$user= $_SESSION['S_IDUSUARIO'];


$vectorIdpersonas = htmlspecialchars($_POST['vectorIdpersonas'],ENT_QUOTES,'UTF-8');
$vectorEst = htmlspecialchars($_POST['vectorEstado'],ENT_QUOTES,'UTF-8');
$fecha = htmlspecialchars($_POST['fechaAsisten'],ENT_QUOTES,'UTF-8');
$idgrado = htmlspecialchars($_POST['idgrado'],ENT_QUOTES,'UTF-8');
$idcurso = htmlspecialchars($_POST['idcurso'],ENT_QUOTES,'UTF-8');
 
date_default_timezone_set('America/Lima'); $fechas= date($fecha); 

$cont=$asistensia->verificar_Asistencia($fechas,$idcurso,$idgrado);
if($cont==0){

 $IdPersona = explode(",",$vectorIdpersonas );
 $vectorEstado = explode(",",$vectorEst );

 for ($i=0; $i <count($IdPersona) ; $i++) { 
  if ($IdPersona[$i] !='') {
   $consulta = $asistensia->Registro_Asistencia($IdPersona[$i],$fechas,$vectorEstado[$i],$idgrado,$user,date('Y'),$idcurso);

 }
}
echo $consulta;
}else{
	echo 2;
}
}else{

	echo 500;
}

?>