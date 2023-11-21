<?php 
ob_start();
$nombreImagen = "IMG14112023134051.jpeg";
$imagenBase64 = "data:image/jpeg;base64," . base64_encode(file_get_contents($nombreImagen));
date_default_timezone_set('America/Lima');
$hoy =  date("Y-m-d");

  $Idpersona = htmlspecialchars($_GET["id"],ENT_QUOTES,'UTF-8');
  
$usuario = 'root';
$password = '';
$db = new PDO('mysql:host=localhost;dbname=escuela', $usuario, $password);

$query = $db->prepare("select codigo,apellidop, alumnonombre, dni, gradonombre, sexo, stadoalumno, fechaRegisto,  direccion from alumno
  inner join grado on grado.idgrado = alumno.grado
  where idalumno= '$Idpersona'");


$query->execute();
$data = $query->fetchAll();
 ?>
 <!DOCTYPE html>
 <html lang="en">
 <head>
  <title>Reporte | Pago</title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link rel="stylesheet" href="../../Plugins/Libreria/boostra4/bootstrap.min.css" integrity="" crossorigin="anonymous">
</head>
<body class="app sidebar-mini">
  <!--Views-->
  <div class="wrap">
     <main class="container">
    <section class="">
      <div class="col-md-4" >
        <div class="panel panel-default">
          <div class="panel-heading">
          </div>
        <style>

    .logoinprim{
      margin-top: 20px;
      margin-left: 110px
    }
    .columnadato{
      background-color: #a0c7e7;
    }
    #tabledata{
      align-content: center;
      margin-left: 35px;
    }
    table, th, td {
  border:1px solid black;
    }
    #table{
     margin-top: 20px;
     margin-left: 40%; 
    }

  </style>
          <div class="panel-body">
            <center  style="justify-content: center;"><img src="<?php echo $imagenBase64 ?>" /></center>

            <br>
            <center><h1><strong>Cédula de matrícula</strong></h1></center>

            <div class="table-responsive" style="justify-content: center;">
              <?php 
              header("content-type:text/html;charset=utf-8");

              $array = array("MATRICULA","APELLIDOS ","NOMBRES ","CURP","GRADO ", "SEXO ","ESTADO " ,"FECHA","DIRECCIÓN");

              echo "<table  id='tabledata' width='700px' border='1px' cellspacing='0' cellpadding='1'>";

              for($i = 0; $i <= 8; ){

                echo "<tr>
                <td class='columnadato'><b> $array[$i]</b></td>";
              
               
                foreach ($data as $dat){
                 echo "<td> <b>$dat[$i]</b></td>";
                 $i++;
               
              }
               echo "</tr>";
             }
             echo "</table>";
             ?>

           </div>

         </div>
         <div class="container" style="justify-content: center;">
           <table id="table" style="" style="justify-content: center;">
            <tr>
              <td><b>FECHA DE REGISTRO</b></td>
            </tr>
            <tr>
              <td><b><?php
                  foreach ($data as $dat){
                   echo $dat[6];
                     }
                ?></b></td>
            </tr>
          </table>
           
         </div>
       </div>
     </div>

   </main>

  </div>

</div>


</body>
</html>


<?php 

$html=ob_get_clean();
//echo $html;
//$pdf->SetFont('Arial','B',10);

require_once '../../Plantilla/Libreria/autoload.inc.php';
Use Dompdf\Dompdf;
$dompdf=new Dompdf();

$options = $dompdf->getOptions();
$dompdf = new Dompdf(array('enable_remote' => true));
$dompdf->setOptions($options);

$dompdf ->loadHtml($html);
$dompdf ->setPaper('letter');

$dompdf ->render();

$dompdf ->stream("Repotre_.pdf" ,array('Attachment' => false ));


 ?>