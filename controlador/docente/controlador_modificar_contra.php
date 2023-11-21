<?php
    require '../../modelo/modelo_docente.php';
    $docent = new Docente();

     $usuid = htmlspecialchars($_POST['idusu'],ENT_QUOTES,'UTF-8');
    $contrabd=htmlspecialchars($_POST['bdcont'],ENT_QUOTES,'UTF-8');
     $contrescrit=htmlspecialchars($_POST['contrAct'],ENT_QUOTES,'UTF-8');
     $contranew = password_hash($_POST['contrnew'],PASSWORD_DEFAULT,['cost'=>10]);
    $newfoto = htmlspecialchars($_POST['nombreArchivo'],ENT_QUOTES,'UTF-8');
    $fotoActual = htmlspecialchars($_POST['fotAct'],ENT_QUOTES,'UTF-8');

   //SI SON IGUALES LAS CONTRACENA NUEW Y ANTIGUO
     if (password_verify($contrescrit,$contrabd)) {

       //SI EXISTE UN NUEVO FOTO AGREGADO
      if(is_array($_FILES) && count($_FILES)>0){

        //MOVER FOTO NUEVO A UN CARPETA
        if(move_uploaded_file($_FILES["f"]["tmp_name"],"../../imagenes/".$newfoto)){
          $newfoto ='imagenes/'.$newfoto;

           $consulta = $docent->CambiarContra_Docente($usuid,$contranew,$newfoto);
           echo  $consulta;

        // echo 1;

        }else{
          //NO MOVER A NINGUN CARPETA
          echo 3;
          }

      }else{
           //CAMBIAR CONTRASEÑA SIN FOTO
          $consulta = $docent->CambiarContra_Docente_sinfoto($usuid,$contranew,$fotoActual);
           echo  $consulta;
      }


     }else{
      //LAS CONTRASEÑA NO COICIDEN
      echo 2;
     }
?>