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
 


 $IdPersona = explode(",",$vectorIdpersonas );
 $vectorEstado = explode(",",$vectorEst );

 for ($i=0; $i <count($IdPersona) ; $i++) { 
  if ($IdPersona[$i] !='') {
  	
   $consulta = $asistensia->Actualizar_Asistencia($IdPersona[$i],$fecha,$vectorEstado[$i],$idgrado,$idcurso);

 }
}
echo $consulta;

}else{

	echo 500;
}

?>