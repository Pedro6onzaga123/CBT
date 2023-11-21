<?php
require('../../Plantilla/reportesFPDF/fpdf/fpdf.php');
date_default_timezone_set('America/El_Salvador');

// $Idpersona = htmlspecialchars($_GET["id"],ENT_QUOTES,'UTF-8');

$usuario = 'root';
$password = '';
$db = new PDO('mysql:host=localhost;dbname=sistemacursov2', $usuario, $password);

$query = $db->prepare("select apellidop, alumnonombre, dni, gradonombre, sexo, stadoalumno, fechaRegisto,  direccion from alumno
inner join grado on grado.idgrado = alumno.idalumno
where idalumno= '9'");

$query->execute();
$data = $query->fetchAll();


class PDF extends FPDF
{
function Header()
{

$this->setY(12);
$this->setX(10);

$this->Image('../../Plantilla/reportesFPDF/img/shinheky.png',25,5,33);

$this->SetFont('times', 'B', 13);

$this->Text(75, 15, utf8_decode('NOMBRE EMPRESA KODO'));

$this->Text(77, 21, utf8_decode('6ª av. Los Angeles, California'));
$this->Text(88,27, utf8_decode('Tel: 7785-8223'));
$this->Text(78,33, utf8_decode('noexisteelemail@gamail.com'));

$this->Image('../../Plantilla/reportesFPDF/img/shinheky.png',160,5,33);

//información de # de factura
$this->SetFont('Arial','B',10);   
$this->Text(150,48, utf8_decode('FACTURA N°:'));
$this->SetFont('Arial','',10);  
$this->Text(176,48, '2002');



// Agregamos los datos del cliente
$this->SetFont('Arial','B',10);    
$this->Text(10,48, utf8_decode('Fecha:'));
$this->SetFont('Arial','',10);    
$this->Text(25,48, date('d/m/Y'));




// Agregamos los datos de la factura
$this->SetFont('Arial','B',10);    
$this->Text(10,54, utf8_decode('Cliente:'));
$this->SetFont('Arial','',10);    
$this->Text(25,54, 'Mikasa Akerman');

$this->Ln(50);
}

function Footer()
{
 $this->SetFont('helvetica', 'B', 8);
    $this->SetY(-15);
    $this->Cell(95,5,utf8_decode('Página ').$this->PageNo().' / {nb}',0,0,'L');
    $this->Cell(95,5,date('d/m/Y | g:i:a') ,00,1,'R');
    $this->Line(10,287,200,287);
    $this->Cell(0,5,utf8_decode("Kodo Sensei © Todos los derechos reservados."),0,0,"C");
    
}


}



$pdf = new PDF();
$pdf->AliasNbPages();
$pdf->AddPage();
$pdf->SetAutoPageBreak(true, 20);
$pdf->SetTopMargin(15);
$pdf->SetLeftMargin(10);
$pdf->SetRightMargin(10);

$pdf->setY(60);$pdf->setX(135);

$array = array("APELLIDOS ","NOMBRES ","DNI","GRADO ", "SEXO ","ESTADO " ,"FECHA","DIRECCIÓN");

$pdf->Ln(10);

$pdf->setX(10);
   
for ($i = 0; $i <= 7;) { 

$pdf->Cell(60,6,$array[$i],1,0);

  foreach ($data as $dat){
             
     $pdf->Cell(60,6,$dat[$i],'1',1,'R');
              
         $i++;
           }

}


$pdf->Output();
?>