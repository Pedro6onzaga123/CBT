<?php
header('Content-type: application/json');
include_once 'conexion.php';

$objeto = new Conexion();
$conexion = $objeto->Conectar();

$result = array();

$consulta = "SELECT nom_prod, sum(stock) FROM productos GROUP BY nom_prod ORDER BY sum(stock) DESC";
$resultado = $conexion->prepare($consulta);
$resultado->execute();

while ($fila = $resultado->fetch(PDO::FETCH_ASSOC)){
    array_push($result, array($fila["nom_prod"], $fila["sum(stock)"] ));
}

print json_encode($result, JSON_NUMERIC_CHECK);
$conexion=null;