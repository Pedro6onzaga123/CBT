<?php
    require '../../modelo/modelo_alumno.php';
    $alumno = new Alumno();

     $nombAlum = htmlspecialchars($_POST['id'],ENT_QUOTES,'UTF-8');
    $consulta = $alumno->listar_meses_pagadosAlum($nombAlum);

     if($consulta){
        echo json_encode($consulta);
    }else{
        echo '{
		    "sEcho": 1,
		    "iTotalRecords": "0",
		    "iTotalDisplayRecords": "0",
		    "aaData": []
		}';
    }
?>