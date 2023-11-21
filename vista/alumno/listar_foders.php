

<script type="text/javascript" src="../js/folder_alumno.js?rev=<?php echo time();?>"></script>

			<style type="text/css">
				.contenido_foldes {
					display: none;
				}
  /* input[type="file"] {
  display: none; 
}*/
	.custom-file-input {
 display: flex;
        border: 1px solid #8b8484;
        padding: 5px 10px;
        border-radius: 5px;
        cursor: pointer;
}

.custom-file-input:hover {
  background-color: #d0d6d7; /* Color de fondo del botón al pasar el cursor sobre él */
}

.custom-file-input {
 
  display: inline-block;
}
.custom-button {
  display: inline-block;
 
}
.btn-personalizado{
	
	background: #464a4a;
	color: white;
	border-radius: 5px;
	border-color: #464a4a;

}
.btn-personalizado:hover {
 color: white;
}
.btn-personalizado:active {
  color: white;
}

<style>
.pdf-color { color: red; }
.doc-color { color: blue; }
.zip-color { color: #04ab21; }
.image-color { color: #0790f1; }
.excel-color { color: purple; }
.ppt-color { color: #f5cd0a; }
.audio-color { color: brown; }
.video-color { color: magenta; }
.default-color { color: gray; }
</style>

			</style>

<div class="col-md-12">
	<div class="box box-warning " style="border-radius: 5px">
		<div class="box-header with-border">
			<h3 class="box-title">BIENVENIDO AL CONTENIDO PRINCIPAL</h3>
			<!-- /.box-tools -->
		</div>
		 
		<!-- /.box-header -->
		<div class="box-body" id="FoldersComponent">
			
		</div>
		<!-- /.box -->
	</div>

<script type="text/javascript">
	


//  document.getElementById('fileInput').addEventListener('change', handleFileSelect, false); 

$(document).ready(function() {

    $('.js-example-basic-single').select2();
    ListarFolders();
    
} );




</script>
