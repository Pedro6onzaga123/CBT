<?php 
  $miCodigo = htmlspecialchars($_GET['id'],ENT_QUOTES,'UTF-8');
   include_once '../../modelo/modelo_horario.php';
            $ddd  = new  Horario(); $horas  =  $ddd-> ListarHoras(); 
 ?>

<style type="text/css">
table{
    background-color: white;
    text-align: left;
    border-collapse: collapse;
    width: 100%;
}
thead{
    background-color: white;
    color: black;
}
tr:hover td{
    background-color: black;
    color: white;
}
</style>
 <script type="text/javascript" src="../js/horario.js?rev=<?php echo time();?>"></script>
<div class="col-md-12">
    <div class="box box-warning box-solid">
        <div class="box-header with-border">
              <h3 class="box-title"> HORARIO </h3>

            <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
            </div>
              <!-- /.box-tools -->
        </div>
             <!-- /////////// -->
    
            <!-- /.box-header -->
            <div class="box-body">
                <div class="row">                      
               <div class="col-md-12">
              <div class="box box-primary">
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

                                        $datoscursos = $ddd->mostratarHorario($c, $hora['idhora'],$miCodigo);
                                       
                                        if (count($datoscursos)> 0) {
                                            foreach ($datoscursos as $value) {
                                                ?>
                                                <td id="td<?php echo $hora['idhora'] . $c; ?>" class="dropzone" idhora="<?php echo $hora['idhora']; ?>" iddia="<?php echo $c ?>" idhorario="<?php echo $value['idhorariocurso'] ?>"><a style='margin-left:4px;' href='javascript:void(0)' onclick="eliminarhorario('td<?php echo $hora['idhora'] . $c; ?>')"><i class='fa fa-trash-o'></i> Eliminar</a>&nbsp;<?php echo $value['nonbrecurso'] ?></td>
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

            <div class="modal-footer">
                <button class="btn btn-primary" onclick="Regresar()"><i class="fa fa-arrow-circle-o-left"><b>&nbsp;Atraz</b></i></button>
                <button type="button" class="btn btn-danger" onclick="Regresar()"  data-dismiss="modal"><i class="fa fa-close"><b>&nbsp;Close</b></i></button>
            </div>
            <br>
            <!-- /.box-body -->
    </div>
          <!-- /.box -->
</div>
<script type="text/javascript">
	
	$('.js-example-basic-single').select2();
</script>