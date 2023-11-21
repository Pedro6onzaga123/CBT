
<?php
    require '../../modelo/modelo_Asistencia.php';
    $asistensia = new Asistensia;

    session_start();

if (!empty($_SESSION['S_IDUSUARIO'])) {

	$user= $_SESSION['S_IDUSUARIO'];

    $idcurso = htmlspecialchars($_POST['idcurso'],ENT_QUOTES,'UTF-8');
    $idgrado = htmlspecialchars($_POST['idgrado'],ENT_QUOTES,'UTF-8');
    $fecha = htmlspecialchars($_POST['fecha'],ENT_QUOTES,'UTF-8');
     date_default_timezone_set('America/Lima');  

     $consulta = $asistensia->GetAsistensiDate($idcurso,$idgrado,$fecha);
 echo json_encode($consulta);
}else{

	echo 500;
}

?>