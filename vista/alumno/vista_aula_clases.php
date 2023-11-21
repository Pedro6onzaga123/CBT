<?php
session_start();
?>
<script type="text/javascript" src="../js/alumno.js?rev=<?php echo time();?>"></script>
<div class="col-md-12">
    <div class="box box-primary">
        <div class="box-header with-border">
              <h3 class="box-title"><b>AULA DE CLASES  DE <label id="gradovistaaulas"></label></b></h3>
            <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
            </div>
              <!-- /.box-tools -->
        </div>
            <!-- /.box-header -->
            <div class="box-body">
            <div class="form-group">     
            </div>
            <input type="text" id="AlumIDgrado" value="<?php echo $_SESSION['S_GRADO'] ?> " hidden>
            <div class="box-body no-padding  table-responsive">
                <table id="table_aulas" class="display responsive nowrap" style="width:100%">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Nombre</th>
                        <th>Piso</th>
                        <th>Numero</th>
                        <th>Aforro</th>
                        <th>Seccion</th>
                       
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>

                </div>
               </div>
                 </div>
            </div>
            </div>
            <!-- /.box-body -->
    </div>
          <!-- /.box -->
</div>

<script>
$(document).ready(function() {
  // gradoid2();
   var idgrado=$("#AlumIDgrado").val();
   aluas_de_clases(idgrado);

} );
</script>