var files;
function Listar_Archivos_alumno(){

 files = $("#tabla_files").DataTable({
        
        "lengthMenu": [
            [10, 25, 50, 100, -1],
            [10, 25, 50, 100, "All"]
        ],
        "pageLength": 10,
        "destroy": true,
        "async": false,
        "processing": true,
        "ajax": {
            "url": "../controlador/alumno/Controller_files_Alumno.php",
            type: 'POST'  
        },
        "columns": [
        {"data": "idfile"},
        {"data": "nombrearchivo"

        },
        { "data": "extension",
         render: function(data, type, row) {
                return "<i class='fa " + getIconClass(data) + "'></i>";
            }

        },
        { "data": "fechaCreate" },
      
        {
            "defaultContent": "<button  type='button' class='download btn btn-primary  btn-sm'><i class='fa fa-cloud-download'></i></button>"+
           
            "&nbsp;<button  type='button' class='visualizar btn  btn-default btn-sm'><i class='fa fa-eye'></i></button>"
        }],
        "language": idioma_espanol,
        select: true
    });
    document.getElementById("tabla_files_filter").style.display = "none";
    $('input.global_filter').on('keyup click', function() {
        filterGlobal();
    });
    files.column( 0 ).visible( false );
    
}
function filterGlobal() {
    $('#tabla_files').DataTable().search($('#global_filter').val(), ).draw();
}


$('#tabla_files').on('click', '.download', function() {
    var data = files.row($(this).parents('tr')).data();
    if (files.row(this).child.isShown()) {
        var data = files.row(this).data();
    }
    var nombreArchivo = data.nombrearchivo;

    // Construir la URL del archivo para descargar
    var rutaArchivo = '../Files/' + nombreArchivo;

    // Crear un enlace de descarga
    var link = document.createElement('a');
    link.href = rutaArchivo;
    link.download = nombreArchivo;

    // Simular el clic en el enlace para iniciar la descarga
    link.click();
});

$('#tabla_files').on('click', '.visualizar', function() {
    var data = files.row($(this).parents('tr')).data();
   
    if (files.row(this).child.isShown()) {
        var data = files.row(this).data();
    }
    var nombreArchivo = data.nombrearchivo;
    var extension = obtenerExtension(nombreArchivo);
    var rutaArchivo = '../Files/' + nombreArchivo;

    verArchivo(rutaArchivo, extension);
      
})

function verArchivo(nombreArchivo, extension) {
  // Construir la URL del archivo
  var rutaArchivo = '../Files/' + nombreArchivo;

  // Convertir la extensión a minúsculas para hacer una comparación insensible a mayúsculas y minúsculas
  var extensionMinuscula = extension.toLowerCase();
   // Abrir el archivo PDF en una nueva pestaña del navegador
    
  // Lógica específica para cada tipo de archivo
  if (extensionMinuscula === 'pdf') {
    // Abrir el archivo PDF en una nueva pestaña del navegador
    window.open(rutaArchivo);
  } else if (extensionMinuscula === 'jpg' || extensionMinuscula === 'png') {
    // Mostrar la imagen en un cuadro de diálogo modal
    window.open(rutaArchivo);
  } else {
    // Otros tipos de archivos
    console.log('No se puede mostrar el archivo');
  }
}

function obtenerExtension(nombreArchivo) {
    var partes = nombreArchivo.split('.');
    if (partes.length > 1) {
        return partes[partes.length - 1];
    } else {
        return '';
    }
}

function getIconClass(extension) {
  var iconClass = '';

  // Asigna la clase del icono según la extensión
  if (extension === 'pdf') {
    iconClass = 'fa-file-pdf-o pdf-color';
  } else if (extension === 'doc' || extension === 'docx') {
    iconClass = 'fa-file-word-o doc-color';
  } else if (extension === 'zip' || extension === 'rar') {
    iconClass = ' fa-file-zip-o zip-color';
  } else if (extension === 'png' || extension === 'jpg' || extension === 'jpeg' || extension === 'gif') {
    iconClass = 'fa-file-image-o image-color';
  } else if (extension === 'xls' || extension === 'xlsx') {
    iconClass = 'fa-file-excel-o excel-color';
  } else if (extension === 'ppt' || extension === 'pptx') {
    iconClass = 'fa-file-powerpoint-o ppt-color';
  } else if (extension === 'mp3' || extension === 'wav' || extension === 'ogg') {
    iconClass = 'fa-file-audio-o audio-color';
  } else if (extension === 'mp4' || extension === 'avi' || extension === 'wmv') {
    iconClass = 'fa-file-video-o video-color';
  } else {
    iconClass = 'fa-file-o default-color';
  }

  return iconClass;
}