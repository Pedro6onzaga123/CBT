<script type="text/javascript" src="../js/files_alumno.js?rev=<?php echo time();?>"></script>

<div class="col-md-12">
    <div class="box box-warning">
        <div class="box-header with-border">
                <h5 class="box-title"><strong>Lista de Archivos</strong> </h5>
            <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
            </div>
              <!-- /.box-tools -->
        </div>

        
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
                        <th>tipo file</th>
                         <th>Fecha creado</th>
                       
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



$(document).ready(function() {
   
    Listar_Archivos_alumno();
} );
</script>