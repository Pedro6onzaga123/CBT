

<?php
     require '../../modelo/modelo_horario.php';

   $horario = new Horario();
   
   $consulta = $horario->listar_Horario();
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