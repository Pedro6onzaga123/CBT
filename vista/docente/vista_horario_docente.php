<script type="text/javascript" src="../js/gra_docent.js?rev=<?php echo time();?>"></script>
<div class="col-md-4">
    <div class="box box-primary">
        <div class="box-header with-border">
              <h3 class="box-title"><b>GRADOS _ HORARIO</b></h3>

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
            <table id="table_horario" class="display responsive nowrap" style="width:100%">
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
<script>
    var cont=0;
$(document).ready(function() {
   listar_horario_grados();
    $("#modal_registro_docente").on('shown.bs.modal',function(){
        $("#txt_usu").focus();  
    }) 

} );
</script>

<div class="col-md-4"  hidden>
    <div class="box box-primary">
        <div class="box-header with-border">
        </div>
            <div class="box-body">
            <div class="form-group">
               <?php  
                  $idgrado=0;
                  $idgrado = htmlspecialchars($_GET['idgrado'],ENT_QUOTES,'UTF-8');
  
                   include_once '../../modelo/modelo_docente.php';
                   $docente  = new  Docente(); $horas  =  $docente-> ListarHoras_docent()
                 ?> 
                
            </div>
            
            </div>
            <!-- /.box-body -->
    </div>
          <!-- /.box -->
</div>



<div class="col-md-8">
    <div class="box box-primary">
        <div class="box-header with-border">
              <h3 class="box-title"><b>HORARIOS DE CLASES </b></h3>

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
            <div class="box-body no-padding  table-responsive">

                <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>hora</th>
                                <th>Lunes</th>
                                <th>Martes</th>
                                <th>Miercoles</th>
                                <th>Jueves</th>
                                <th>Viernes</th>
                            </tr>

                            <?php foreach ($horas as $hora) { ?>
                                <tr>
                                    <td><?php echo $hora['inicio'] . ' - ' . $hora['fin']; ?></td>
                                    <?php
                                    for ($c = 1; $c <= 5; $c++) {

                                        $datoscursos = $docente->mostratarHorario_docent($c, $hora['idhora'],$idgrado );
                                        if (count($datoscursos)> 0) {
                                            foreach ($datoscursos as $value) {
                                                ?>
                                                <td id="td<?php echo $hora['idhora'] . $c; ?>" class="dropzone" idhora="<?php echo $hora['idhora']; ?>" iddia="<?php echo $c ?>" idhorario="<?php echo $value['idhorariocurso'] ?>"><?php echo $value['nonbrecurso'] ?></td>
                                                <?php
                                            }
                                        } else {
                                            ?>
                                            <td id="td<?php echo $hora['idhora'] . $c; ?>" class="dropzone" idhora="<?php echo $hora['idhora']; ?>" iddia="<?php echo $c ?>" idhorario=""></td>
                                            <?php
                                        }
                                    }
                                    ?>
                                </tr>
                            <?php } ?>

                        </thead>
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


