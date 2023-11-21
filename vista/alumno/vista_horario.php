

<div class="col-md-12">
  <?php  
  session_start();
  $idgrado = $_SESSION['S_GRADO'] ;
   include_once '../../modelo/modelo_alumno.php';
           $alumno  = new  Alumno(); $horas  =  $alumno-> ListarHoras_Alumno();
 ?>
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

                                        $datoscursos = $alumno->mostratarHorario_Alumno($c, $hora['idhora'],$idgrado );
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

<script>
$(document).ready(function() {
  
 
} );
</script>