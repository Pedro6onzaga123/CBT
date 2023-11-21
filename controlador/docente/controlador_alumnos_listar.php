<?php
    require '../../modelo/modelo_docente.php';
    $docent = new Docente;
    $idgrado = htmlspecialchars($_POST['idgradoencurso'],ENT_QUOTES,'UTF-8');
   $resultado = $docent->listar_Alumnos_de_grado($idgrado);// Obtener el arreglo de resultados

   // $request= $docent->listar_Notas_Alumnos($idgrado);



if (isset($resultado['data'])) { // Verificar si hay resultados en el arreglo
    foreach ($resultado['data'] as &$alumno) { // Usar "&" para pasar por referencia y poder modificar el arreglo original
        // Agregar el nuevo campo "promedio"
        $nota = $docent->Verificar_Notas_Alumnos($alumno['idalumno'],$idgrado); // Función que devuelve el promedio del alumno
        $alumno['nota'] = $nota;

    }
} 



    if($resultado){
        echo json_encode($resultado);
    }else{
        echo '{
		    "sEcho": 1,
		    "iTotalRecords": "0",
		    "iTotalDisplayRecords": "0",
		    "aaData": []
		}';
    }

?>


