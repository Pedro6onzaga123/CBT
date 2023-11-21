<script type="text/javascript" src="../js/gra_docent.js?rev=<?php echo time();?>"></script>
<div class="col-md-4">
    <div class="box box-warning">
        <div class="box-header with-border">
              <h3 class="box-title"><b>GRADOS _ AULAS</b></h3>

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
            <table id="tabal_grad_aula" class="display responsive nowrap" style="width:100%">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Grados</th>
                        <th>Acci&oacute;n</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                        
                    </tr>
                </tfoot>
            </table>
            </div>
            <!-- /.box-body -->
    </div>
          <!-- /.box -->
</div>
<div class="col-md-8" id="divaulas" hidden>
    <div class="box box-warning">
        <div class="box-header with-border">
              <h3 class="box-title"><b>AULA ASISGNADO PARA <label id="gradoNomb"></label></b></h3>

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
            <table id="table_aulas" class="display responsive nowrap" style="width:100%">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Nombre</th>
                        <th>Piso</th>
                        <th>N&uacute;mero</th>
                        <th>Aforro</th>
                        <th>Secci&oacute;n</th>
                       
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
            <!-- /.box-body -->
    </div>
          <!-- /.box -->
</div>
<script>
    var cont=0;
$(document).ready(function() {
    listar_grados_aulas();
    $("#modal_registro_docente").on('shown.bs.modal',function(){
        $("#txt_usu").focus();  
    })

   


    ////////////////

   

} );
</script>