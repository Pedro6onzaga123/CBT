

function ListarGradosDocente() {
   var identi='';var nameCombo="--seleccione--";
   $.ajax({
        url: '../controlador/files/ControllerGradosDocente.php',
        type: 'POST'
       
    }).done(function(resp) {
        var data = JSON.parse(resp);
        var cadena = "";
        if (data.length > 0) {
             cadena += "<option value='" + identi+ "'>" + nameCombo + "</option>";
            for (var i = 0; i < data.length; i++) {
                cadena += "<option value='" + data[i]['idgrado'] + "'>" + data[i]['gradonombre'] + "</option>";
            }
            $('#gradosId').html(cadena);////lamndo en crer horari
 
        } else {
            cadena += "<option value=''>NO SE ENCONTRARON REGISTROS</option>";
            $("#gradosId").html(cadena);
           
        }
    })
   
}


  function handleFileSelect(event) {
    event.preventDefault();

    var files = event.target.files;
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      mostrarVistaPrevia(file);
    }

    actualizarContador(files.length);
    // Limpia el campo de selección de archivos para permitir seleccionar los mismos archivos nuevamente
   // event.target.value = '';
  }

  function mostrarVistaPrevia(file) {
    var reader = new FileReader();
    reader.onload = function(e) {
      var previewContainer = document.createElement('div');
      previewContainer.className = 'previewItem';

      var preview;
      if (file.type.match('image.*')) {
        preview = document.createElement('img');
        preview.src = e.target.result;
      } else {
        preview = document.createElement('span');
        preview.innerHTML = '<i class="fa fa-file"></i>';
      }

      
      var fileName = document.createElement('p');
       fileName.className = 'help-block';
       fileName.textContent = file.name; // Mostrar el nombre del archivo
     
   

      var removeButton = document.createElement('button');
      removeButton.type = 'button';
      removeButton.className = 'btn btn-box-tool';
 
      removeButton.onclick = function() {
        quitarSeleccion(file);
        previewContainer.remove();
        actualizarContador(document.getElementById('previewContainer').children.length);
      };

      var removeButtonIcon = document.createElement('em');
      removeButtonIcon.className = 'fa fa-times';
      removeButton.appendChild(removeButtonIcon);

      previewContainer.appendChild(preview);
      previewContainer.appendChild(removeButton);
       previewContainer.appendChild(fileName);

      document.getElementById('previewContainer').appendChild(previewContainer);
    };

    reader.readAsDataURL(file);
  }

  function quitarSeleccion(file) {
      var fileInput = document.getElementById('fileInput');
      var dataTransfer = new DataTransfer();

      for (var i = 0; i < fileInput.files.length; i++) {
        if (fileInput.files[i] !== file) {
          dataTransfer.items.add(fileInput.files[i]);
        }
      }

      fileInput.files = dataTransfer.files;
}


  function actualizarContador(count) {
    var fileCount = document.getElementById('fileCount');
    fileCount.textContent = '' + count;
  }



function enviarArchivos() {
  var idforder=0;
  var gradosId=$("#gradosId").val();
  if (gradosId?.length==0) {
     return Swal.fire("Mensaje de advertencia", "Seleccione el grado", "warning");
   }
  var fileInput = document.getElementById('fileInput');
  var formData = new FormData();

  for (var i = 0; i < fileInput.files.length; i++) {
    var file = fileInput.files[i];
    formData.append('files[]', file);
  }
  formData.append('gradosId', gradosId);
 
 $('#button_resgist').prop('disabled',true);
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '../controlador/files/ControllerSendFiles.php', true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var respuesta = xhr.responseText;
      console.log(respuesta);
      if (respuesta==1) {
          
        Swal.fire({icon: 'success', title: 'Mensaje de Éxito !!', text:'La asistensia se guardo corectamente.', showConfirmButton: false,timer: 1500 });
            $('#button_resgist').prop('disabled',false);
            limpiarFiles();
             Listar_Archivos();


      }
      else {
         $('#button_resgist').prop('disabled',false);
      }
    

     
    }
  };
  xhr.send(formData);
}

var files;
function Listar_Archivos(){

 files = $("#tabla_files").DataTable({
        "ordering": false,
        "bLengthChange": false,
        "searching": {
            "regex": false
        },
        "lengthMenu": [
            [10, 25, 50, 100, -1],
            [10, 25, 50, 100, "All"]
        ],
        "pageLength": 10,
        "destroy": true,
        "async": false,
        "processing": true,
        "ajax": {
            "url": "../controlador/files/ControlleGetFiles.php",
            type: 'POST'  
        },
        "columns": [
        {"data": "idfile"},
        {"data": "nombrearchivo"},
        { "data": "fechaCreate" },
        {"data": "gradonombre"},
        {
            "defaultContent": "<button  type='button' class='download btn  btn-sm'><i class='fa fa-cloud-download'></i></button>"+
            "&nbsp;<button  type='button' class='eliminar btn  btn-sm'><i class='fa fa-trash'></i></button>"+
            "&nbsp;<button  type='button' class='visualizar btn  btn-sm'><i class='fa fa-eye'></i></button>"
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
  if (extensionMinuscula === 'pdf' || extensionMinuscula === 'docx' || extensionMinuscula === 'pptx'||extensionMinuscula === 'text') {
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


$('#tabla_files').on('click', '.download', function() {
    var data = files.row($(this).parents('tr')).data();
    if (files.row(this).child.isShown()) {
        var data = files.row(this).data();
    }
    var nombreArchivo = data.nombrearchivo;
    console.log(data);

    // Construir la URL del archivo para descargar
    var rutaArchivo = '../Files/' + nombreArchivo;

    // Crear un enlace de descarga
    var link = document.createElement('a');
    link.href = rutaArchivo;
    link.download = nombreArchivo;

    // Simular el clic en el enlace para iniciar la descarga
    link.click();
});

$('#tabla_files').on('click', '.eliminar', function() {
    var data = files.row($(this).parents('tr')).data();
    if (files.row(this).child.isShown()) {
        var data = files.row(this).data();
    }
    console.log(data);
  
    // Aquí puedes llamar a una función para eliminar el archivo utilizando los datos obtenidos
    eliminarArchivo(data.idfile);
});


function eliminarArchivo(idArchivo) {
    // Realizar una solicitud AJAX al servidor para eliminar el archivo con el ID proporcionado
    $.ajax({
        url: '../controlador/files/ControllerDeleteFile.php',
        type: 'POST',
        data: {idArchivo: idArchivo},
        success: function(response) {
            // Manejar la respuesta del servidor después de eliminar el archivo
            console.log('Archivo eliminado con éxito');
            
            // Volver a cargar la tabla de archivos para reflejar los cambios
            Listar_Archivos();
        },
        error: function(xhr, status, error) {
            // Manejar cualquier error en la solicitud AJAX
            console.error('Error al eliminar el archivo:', error);
        }
    });
}

function limpiarFiles(){

  // Obtener referencia al campo de entrada de archivo
var fileInput = document.getElementById('fileInput');

// Restablecer el campo de entrada de archivo
fileInput.value = '';

$('#previewContainer').html('');
  $('#fileCount').html('');
   $('#gradosId').val(0).trigger('change');

// Opcionalmente, restablecer también el formulario
var form = fileInput.closest('form');
form.reset();

}
