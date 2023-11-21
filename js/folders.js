


function ListarFolders() {
 
   $.ajax({
        url: '../controlador/folders/ControllerGetFolder.php',
        type: 'POST'
       
    }).done(function(resp) {
        var data = JSON.parse(resp);
        if (data.length>0) {

        var html='';
        $.each(data, function(i,elemt) {
        html += "<div class='box'>";
        html += "<div class='box-header with-border' onclick='toggleDiv("+elemt.idforder+")' style='cursor: pointer;'>";
          html += "<i class='fa fa-folder-open fa-4x' style='color:#248ae1'></i>";
            html += "<h3 class='box-title'>"+elemt.nameforder+"</h3>";
          html += "</div>";
          html += "<div class='box-body contenido_foldes' id='contenfiles"+elemt.idforder+"'>";
            html += "</div>";
        html += "</div>";
      html += "</div>";

           });
    $('#FoldersComponent').append(html);

      }else {
        $("#FoldersComponent").html('<h3> No hay folders. </h3>');
      }
        
    })
}


function toggleDiv(Id) {
  	var contet="contenfiles"+Id;
  var div = document.getElementById(""+contet+"");
  div.classList.toggle("show");

  ListarFilesFolderSelecionado(Id);
}


function ListarFilesFolderSelecionado(id) {
  var idfolder=id;
   $.ajax({
        url: '../controlador/folders/ControllerGetFiles.php',
        type: 'POST',
        data:{idfolder:idfolder}
       
    }).done(function(resp) {
        
        if(resp.length !=0){
         var data = JSON.parse(resp);
        }
        try {
       
        //idfile, nombrearchivo, fechaCreate
        Recorer_Files_Folder(data,idfolder);
 
      } catch (error) {
        console.error("Error al analizar el JSON: " + error);
         }

        
    })
   
}


function Recorer_Files_Folder(data, idfolder) {
  $("#contenfiles" + idfolder).html('');
  var html = '';
  html += "<div>";
  html += "<form autocomplete='false' method='POST' id='form" + idfolder + "' enctype='multipart/form-data' onsubmit='return false'>";
  html += "<label for='fileInput" + idfolder + "' class='custom-file-input' style='display: inline-block;'>"; // Agregar estilo inline
 // html += "<span><i class='fa fa-upload'></i> Seleccionar archivos</span>";
  html += "<input type='file' id='fileInput" + idfolder + "' name='files[]' multiple>";
  html += "</label>";
  html += "&nbsp;<button class='btn btn-personalizado btn-sm' id='buttum_register" + idfolder + "' onclick='GuardarFiles(" + idfolder + ")' style='display: inline-block;'><i class='fa fa-save'></i> Guardar</button>"; // Agregar estilo inline
  html += "<p class='box-tools pull-right' id='fileCount" + idfolder + "'>0</p>";
  html += "</form>";
  html += "</div>";
  $("#contenfiles" + idfolder).append(html);
   RecorerFiles(data,idfolder);
}



function RecorerFiles(data,idfolder){
 var html='';
 if (data.length > 0) {
        $("#fileCount"+idfolder).html(data.length);
        html += "<div class='todo-list ui-sortable'>";
        $.each(data, function(i,elemt) {
        var extension = elemt.nombrearchivo.split('.').pop().toLowerCase();
        var iconClass = getIconClass(extension);


        html += "<li>";
         html += "<span class='handle ui-sortable-handle'>";
        html += "<i class='fa " + iconClass + "'></i>";
         html += "</span>";
         html += "<span class='text'>"+elemt.nombrearchivo+"</span>";
         html += "<small class='label label-default'><i class='fa fa-check'></i>"+elemt.fechaCreate+"</small>";
         html += "<div class='tools'>";
         html += "<div class='timeline-footer'>";
        html += "<a class='btn btn-secondary btn-xs' onclick='verarchivo("+elemt.idfile+")'><i class='fa fa-eye'></i></a>";
        html += "<a class='btn btn-secondary btn-xs' onclick='dowloadfile("+elemt.idfile+")'><i class='fa  fa-cloud-download'></i></a>";
        html += "<a class='btn btn-secondary btn-xs' onclick='Deletefile("+elemt.idfile+","+idfolder+")'><i class='fa  fa-trash-o'></i></a>";
         html += "</div>";
        html += "</div>";
        html += "</li>";
        
        })
        html += "</div>";
       $("#contenfiles"+idfolder).append(html);
           
        } else {

        $("#contenfiles"+idfolder).append('<h6 class="text"> No hay Archivos. </h6>');
           
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





function GuardarFiles(idforder){
	var idformulario="form"+idforder;
	var idinput="fileInput"+idforder;
	var form = document.getElementById(""+idformulario+"");
	var fileInput = document.getElementById(idinput);

	if (fileInput.files.length > 0) {
		var formData = new FormData(form);

		for (var i = 0; i < fileInput.files.length; i++) {
			var file = fileInput.files[i];
			formData.append('files[]', file);
		}
  var log =fileInput.files.length;
		$.ajax({
			url: '../controlador/files/ControllerGradosDocente.php',
			type: 'POST'

		}).done(function(resp) {
			var data = JSON.parse(resp);
			if (data.length > 0) {

				var selectHTML = "<select id='idgrado' class='js-example-basic-single' style='width:100%;'>";
				for (var i = 0; i < data.length; i++) {
					selectHTML += "<option value='" + data[i]['idgrado'] + "'>" + data[i]['gradonombre'] + "</option>";
				}
				selectHTML += "</select>";

				Swal.fire({
					title: "Selecciona Grado",
					html: selectHTML,
					showCancelButton: true,
					confirmButtonText: "Aceptar",
					cancelButtonText: "Cancelar"
				}).then(function(result) {
					if (result.value) {
						var gradosId = document.getElementById("idgrado").value;

						formData.append('gradosId', gradosId);
						formData.append('idforder', idforder);
            formData.append('log', log);


						$('#buttum_register'+idforder).prop('disabled',true);
						var xhr = new XMLHttpRequest();
						xhr.open('POST', '../controlador/folders/ControllerSaveFiles.php', true);
						xhr.onreadystatechange = function() {
							if (xhr.readyState === 4 && xhr.status === 200) {
								var respuesta = xhr.responseText;
								console.log(respuesta);
								if (respuesta==1) {

									Swal.fire({icon: 'success', title: 'Mensaje de Éxito !!', text:'Los archivos se subieron corectamenta.', showConfirmButton: false,timer: 1500 });
									$('#buttum_register'+idforder).prop('disabled',false);
                                   ListarFilesFolderSelecionado(idforder);
								}
								else {
									$('#buttum_register'+idforder).prop('disabled',false);
								}



							}
						};
						xhr.send(formData);


					}
				});




			} else {


			}
		})




	}else{
		return Swal.fire("Mensaje de advertencia", "Por lo menos selecciona un archivo.", "warning");	
	}

}

function Deletefile(idArchivo,idfile) {
    // Realizar una solicitud AJAX al servidor para eliminar el archivo con el ID proporcionado
    $.ajax({
        url: '../controlador/files/ControllerDeleteFile.php',
        type: 'POST',
        data: {idArchivo: idArchivo},
        success: function(response) {
            // Manejar la respuesta del servidor después de eliminar el archivo
            console.log('Archivo eliminado con éxito');
            if(response==1){
             ListarFilesFolderSelecionado(idfile);
            }
        },
        error: function(xhr, status, error) {
            // Manejar cualquier error en la solicitud AJAX
            console.error('Error al eliminar el archivo:', error);
        }
    });
}


function verarchivo(idfile) {

$.ajax({
      url: '../controlador/folders/ControllerVerFiles.php',
      type: 'POST',
      data:{idfile:idfile}

    }).done(function(resp) {
      var data = JSON.parse(resp);
          if(data.length !=0){

        var rutaArchivo = '../Files/' + data[0]['nombrearchivo'];

          window.open(rutaArchivo, '_blank');
          }
    })

}


function dowloadfile(idfile){

  $.ajax({
      url: '../controlador/folders/ControllerVerFiles.php',
      type: 'POST',
      data:{idfile:idfile}

    }).done(function(resp) {
      var data = JSON.parse(resp);
          if(data.length !=0){

        var rutaArchivo = '../Files/' + data[0]['nombrearchivo'];

     var link = document.createElement('a');
    link.href = rutaArchivo;
    link.download = rutaArchivo;

    // Simular el clic en el enlace para iniciar la descarga
    link.click();
          }
    })
}


