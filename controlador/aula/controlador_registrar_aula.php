
<?php
    require '../../modelo/modelo_aula.php';
    $aula = new Aula();
     $idAula = htmlspecialchars($_POST['idAula'],ENT_QUOTES,'UTF-8');
     if ($idAula==null) {
        $nombre = htmlspecialchars($_POST['nombre'],ENT_QUOTES,'UTF-8');
        $piso=htmlspecialchars($_POST['piso'],ENT_QUOTES,'UTF-8');
        $numero = htmlspecialchars($_POST['numero'],ENT_QUOTES,'UTF-8');
        $aforro = htmlspecialchars($_POST['aforro'],ENT_QUOTES,'UTF-8');
        $seccion = htmlspecialchars($_POST['seccion'],ENT_QUOTES,'UTF-8');
         $estado = htmlspecialchars($_POST['estado'],ENT_QUOTES,'UTF-8');
        $consulta = $aula->Registrar_Aula($nombre,$piso,$numero,$aforro,$seccion,$estado);
       echo $consulta;
         
     }else{
        
        $nombre = htmlspecialchars($_POST['nombre'],ENT_QUOTES,'UTF-8');
        $piso=htmlspecialchars($_POST['piso'],ENT_QUOTES,'UTF-8');
        $numero = htmlspecialchars($_POST['numero'],ENT_QUOTES,'UTF-8');
        $aforro = htmlspecialchars($_POST['aforro'],ENT_QUOTES,'UTF-8');
        $seccion = htmlspecialchars($_POST['seccion'],ENT_QUOTES,'UTF-8');
         $estado = htmlspecialchars($_POST['estado'],ENT_QUOTES,'UTF-8');
        $consulta = $aula->Actualizar_Aula($idAula,$nombre,$piso,$numero,$aforro,$seccion,$estado);
       echo $consulta;

     }
    
?>