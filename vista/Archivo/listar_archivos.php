<script type="text/javascript" src="../js/files.js?rev=<?php echo time();?>"></script>

<style>
    #previewContainer {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    .previewItem {
      display: flex;
      flex-direction: column;
      align-items: center;
      border: 1px solid #0430ef;
      padding: 10px;
      border-radius: 5px;
      width: 255px;
    }

    .previewItem span {
      align-self: flex-start;
    }

    .previewItem p {
      width: 100%;
      text-align: center;
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

   .previewItem button {
     align-self: flex-end;
     margin-top: -35px;
   }

   .previewItem img {
   width :25px;
       height :25px;
   }

   input[type="file"] {
  display: none; /* Oculta el elemento de entrada de archivos predeterminado */
}

.custom-file-input {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #8b8484; /* Color del borde del botón */
  color: #8b8484; /* Color del texto y del icono del botón */
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.custom-file-input span {
  display: flex;
  align-items: center;
}

.custom-file-input i {
  margin-right: 5px; /* Espacio entre el icono y el texto */
}



.custom-file-input:hover {
  background-color: #d0d6d7; /* Color de fondo del botón al pasar el cursor sobre él */
}

.custom-file-input:active {
  background-color: #6f7676; /* Color de fondo del botón al hacer clic en él */
}



</style>


<form autocomplete="false"  method="POST" action="#" enctype="multipart/form-data" onsubmit="return false">
<div class="col-md-4">
    <div class="box box-warning">
        <div class="box-header with-border">
              <h5 class="box-title" ><strong style="display: flex;">Registrar Archivos:<p id="fileCount"></p> </strong> </h5>

            <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
            </div>
              <!-- /.box-tools -->
        </div>
            <!-- /.box-header -->
            <div class="box-body">
            <div class="form-group">
               <div class="col-lg-12">
                    <label for=""> Grados</label>
                    <select class="js-example-basic-single" name="state" id="gradosId" style="width:100%;">
                       
                    </select><br><br>
                </div>
                
                  <label for="fileInput" class="custom-file-input">
                   <span><i class="fa fa-upload"></i> Seleccionar archivos</span>
                   <input type="file" id="fileInput" name="files[]" multiple>
                 </label>
                 <br>
                  <div id="previewContainer"></div>
            <br>
                <div class="modal-footer">
                <button class="btn btn-sm"  id="button_resgist" style="background: #05ccc4;color: white" onclick="enviarArchivos()"><i class="fa fa-check"><b>&nbsp;Registrar</b></i></button>
                <button type="button" class="btn  btn-sm" onclick="limpiarFiles()"><i class="fa fa-close"><b>&nbsp;Cancelar</b></i></button>
            </div>
            </div>
            
            </div>
            <!-- /.box-body -->
    </div>
          <!-- /.box -->
</div>
</form>

<div class="col-md-8">
    <div class="box box-warning">
        <div class="box-header with-border">
                <h5 class="box-title"><strong>Lista de Archivos</strong> </h5>
            <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
            </div>
              <!-- /.box-tools -->
        </div>
            <!-- /.box-header -->
            <div class="box-body">
            <div class="form-group">
                <div class="col-lg-10 pull-right">
                    <div class="input-group pull-right">
                        <input type="text" class="global_filter form-control " id="global_filter" placeholder="Ingresar dato a buscar" style="border-radius: 5px">
                        
                    </div>
                </div>
            </div>
            <table id="tabla_files" class="display responsive nowrap" style="width:100%">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Fecha creado</th>
                         <th>Visible</th>
                       
                        <th>Acci&oacute;n</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                         <th></th>
                         <th></th>

                </tfoot>
            </table>
            </div>
            <!-- /.box-body -->
    </div>
          <!-- /.box -->
</div>

<script>

  document.getElementById('fileInput').addEventListener('change', handleFileSelect, false); 

$(document).ready(function() {
    $('.js-example-basic-single').select2();
    ListarGradosDocente();
    Listar_Archivos();
} );
</script>