


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
        url: '../controlador/alumno/ControllerGetFiles.php',
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
        html += "<i class='fa  fa-check-circle-o'></i>";
         html += "</span>";
         html += "<span class='text'>"+elemt.nombrearchivo+"</span>";
         html += "<small class='label label-default'><i class='fa fa-check'></i>"+elemt.fechaCreate+"</small>";
         html += "<div class='tools'>";
         html += "<div class='timeline-footer'>";
        html += "<a class='btn btn-secondary btn-xs' onclick='verarchivo("+elemt.idfile+")'><i class='fa fa-eye'></i></a>";
        html += "<a class='btn btn-secondary btn-xs' onclick='dowloadfile("+elemt.idfile+")'><i class='fa  fa-cloud-download'></i></a>";
       
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


