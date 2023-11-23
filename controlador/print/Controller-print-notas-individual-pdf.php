<?php


// Recibir los datos del cuerpo de la solicitud POST
$data = json_decode(file_get_contents("php://input"), true);
date_default_timezone_set('America/New_York'); 

$notas=$data[0];
$sumaPracticas = 0;
$sumaTrabajos = 0;
$sumaParciales = 0;
$sumaExamenes = 0;

// Inicializar un nuevo array para los valores no numéricos
$valoresNoNumericos = array();

// Filtrar y eliminar los valores no numéricos del array original
foreach ($notas as $clave => $valor) {
    if (!is_numeric($valor)) {
        $valoresNoNumericos[$clave] = $valor;
        unset($notas[$clave]);
    }
}
$html = ''; 

$html = '<style>';
$html .= 'table {';
$html .= '    width: 100%;';
$html .= '    border-collapse: collapse;';
$html .= '    font-size: 10px; /* Ajusta el tamaño de fuente */';
$html .= '}';

$html .= 'th, td {';
$html .= '    border: 1px solid #dddddd;';
$html .= '    text-align: left;';
$html .= '    padding: 6px; /* Ajusta el espacio alrededor del contenido */';
$html .= '}';

$html .= 'th {';
$html .= '    background-color: #f2f2f2;';
$html .= '}';


$html .= '</style>';
//datos
$html .= '<div class="datos-container">';
$html .= '<p>Inst: CBT N. 2 Texcaltitlán</p>';
$html .= '<p>Curso: ' . $valoresNoNumericos['nonbrecurso'] . '</p>';
$html .= '<p>Alumno: ' . $valoresNoNumericos['alumnonombre'] . ' ' . $valoresNoNumericos['apellidop'] . '</p>';
$html .= '</div>';
// Generar la tabla
$html .= '<table>';
$html .= '<tr>';
$html .= '<th>practica N° 1</th>';
$html .= '<th>practica N° 2</th>';
$html .= '<th>practica N° 3</th>';
$html .= '<th>practica N° 4</th>';
$html .= '<th>trabajo N° 1</th>';
$html .= '<th>trabajo N° 2</th>';
$html .= '<th>trabajo N° 3</th>';
$html .= '<th>trabajo N° 4</th>';
$html .= '<th>parcial N° 1</th>';
$html .= '<th>parcial N° 2</th>';
$html .= '<th>parcial N° 3</th>';
$html .= '<th>parcial N° 4</th>';
$html .= '<th>examen N° 1</th>';
$html .= '<th>examen N° 2</th>';
$html .= '</tr>';

$html .= '<tr>';
foreach ($notas as $clave => $valor) {
    $html .= '<td>' . $valor . '</td>';
    // Sumar valores específicos
    if (strpos($clave, 'practica') !== false) {
        $sumaPracticas += (int)$valor;
    } elseif (strpos($clave, 'trabajo') !== false) {
        $sumaTrabajos += (int)$valor;
    } elseif (strpos($clave, 'parcial') !== false) {
        $sumaParciales += (int)$valor;
    } elseif (strpos($clave, 'exsamen') !== false) {
        $sumaExamenes += (int)$valor;
    }
}
$html .= '</tr>';

$porcentajePracticas = (($sumaPracticas)/4) * 0.2;
$porcentajeTrabajos = (($sumaTrabajos)/4) * 0.2;
$porcentajeParciales = (($sumaParciales)/4) * 0.2;
// Calcular el 40% de la suma de exámenes
$porcentajeExamenes = (($sumaExamenes/2)) * 0.4;

$html .= '<tr>';
$html .= '<td >Prácticas</td>';
$html .= '<td>20% </td>'; 
$html .= '<td colspan=2>' . $porcentajePracticas . '</td>';
$html .= '<td >Trabajo</td>';
$html .= '<td>20% </td> ';
$html .= '<td colspan=2 >' . $porcentajeTrabajos . '</td>';
$html .= '<td>Parciales</td>';
$html .= '<td>20% </td>'; 
$html .= '<td colspan=2 >' .$porcentajeParciales. '</td>';
$html .= '<td>Éxamen 40%</td>';
$html .= '<td>'.$porcentajeExamenes.'</td>';
$html .= '</tr>';


$sumaTotal = $porcentajePracticas + $porcentajeTrabajos + $porcentajeParciales + $porcentajeExamenes;

$html .= '<tr>
          <td colspan=13>Ponderado</td>
          <td >'.$sumaTotal.'</td>
        </tr>';

$html .= '</table>';

// Mostrar la suma de las prácticas, trabajos, parciales y exámenes

require_once '../../Plantilla/Libreria/autoload.inc.php';
use Dompdf\Dompdf;
$dompdf = new Dompdf();
$options = $dompdf->getOptions();
$dompdf->loadHtml($html);
$dompdf->setPaper('letter', 'landscape');  // Establece la orientación a landscape

$dompdf->render();

// Cambia 'Repotre_.pdf' a un nombre de archivo más adecuado
$dompdf->stream("Registro.pdf", array('Attachment' => false));





?>
