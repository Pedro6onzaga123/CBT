<?php
/*$IDUSUARIO = $_POST['idusuario'];
$USER = $_POST['user']; 
$ROL = $_POST['rol'];

session_start();
$_SESSION['S_IDUSUARIO']=$IDUSUARIO;
$_SESSION['S_USER']=$USER;
$_SESSION['S_ROL']=$ROL;
//echo $IDUSUARIO ;*/

$IDUSUARIO = $_POST['idusuario'];
$USER = $_POST['user'];
$GRADO = $_POST['grado']; 
$ROL = $_POST['rol'];

session_start();
$_SESSION['S_IDUSUARIO']=$IDUSUARIO;
$_SESSION['S_USER']=$USER;
$_SESSION['S_GRADO']=$GRADO;
$_SESSION['S_ROL']=$ROL;
//echo $IDUSUARIO ;

?>