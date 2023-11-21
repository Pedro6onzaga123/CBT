

<?php
include_once '../../modelo/modelo_horario.php';
$ddd  = new  Horario();

$a[0] = 1;

$cursos = $ddd->listar_combo_cursos();
$horas  =  $ddd-> ListarHoras();

?>


<script type="text/javascript" src="../js/horario.js?rev=<?php echo time();?>"></script>

<div class="col-md-12">
<div class="alert  alert-dismissible" style="background: #39CCCC">
<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
<h4 style="color: white"><i class="icon fa fa-warning" style="color: white"></i><strong>Inportante.</strong> Primero debes seleccionar el grado, para empezar arrastrar los cursos.</h4>

</div>
</div>
<div class="col-md-12" id="create-form-horario">
          <div class="box box-warning box-solid">
          
            <div class="box-header with-border">
              <h3 class="box-title">NUEVO HORARIO</h3>

              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
              </div>
              <!-- /.box-tools -->
            </div>

            <!-- /.box-header -->
            <div class="box-body">
    <section class="content" >
      <div class="row">
        <div class="col-md-3">

           
            <div class="box-body">
              <div class="btn-group" style="width: 100%; margin-bottom: 10px;">
                    <label for=""><b>GRADO<b></label>
                    <select class="js-example-basic-single" name="state" id="txt_gradoH" style="width:100%;" > 
                    </select>
                
              </div>
            </div>
         

         <div class="container">
           <div class="container">
             <div id="divtrabajo"></div>
           </div>
         </div>

          <div class="box box-solid">
            <div class="box-header with-border">
              <label for=""><b>CURSOS<b></label>
            </div>
            <div class="box-body">
               
              <input type="text" name="" id="id_horario" hidden>

              <!-- the events -->
              <?php
                    foreach ($cursos as $curso){
                        ?>
                        <div class="external-event  ui-draggable ui-draggable-handle" style="background: #05ccc4" idcurso="<?php echo $curso['idcurso'] ?>" draggable="true" ondragstart="event.dataTransfer.setData('text/plain',null)" style="margin-bottom: 5px;padding: 5px;border-radius:4px;position: relative;"><?php echo $curso['nonbrecurso']; ?></div>

                    <?php } ?> 

            </div>
            <!-- /.box-body -->
          </div>
                  
        </div>
            <div class="card-body">  
            <span class='label label-success'>Semestre&nbsp;</span><ul id="HsemestreHsem"></ul>&nbsp;<br>
            </div>
        <!-- /.col -->
        <div class="col-md-9">
          <div class="box box-primary">
            <div class="box-body no-padding  table-responsive">
              <!-- THE table -->
             <table class="table table-bordered table-sm">
                        <thead>
                            <tr >
                                <th>hora</th>
                                <th>Lunes</th>
                                <th>Martes</th>
                                <th>Miercoles</th>
                                <th>Jueves</th>
                                <th>Viernes</th>
                            </tr>

                            <?php foreach ($horas as $hora) { ?>
                                <tr >
                                    <td><?php echo $hora['inicio'] . ' - ' . $hora['fin']; ?></td>
                                    <?php
                                    for ($c = 1; $c <= 5; $c++) {
                                        
                                        if (!count($a) > 0) {      
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
            <!-- /.box-body -->
          </div>
          <!-- /. box -->
        </div>
        <!-- /.col -->
      </div>
      <!-- /.row -->
    </section>
            </div> 

           <div class="modal-footer">
                <button class="btn btn-primary" onclick="Registrar_Horario()"><i class="fa fa-check"><b>&nbsp;Save</b></i></button>
                <button type="button" class="btn btn-danger" onclick="Regresar()"  data-dismiss="modal"><i class="fa fa-close"><b>&nbsp;Cerrar</b></i></button>
            </div>
            <br>


        </div>
      </div>




    


<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
   
  <script> 

 $(document).ready(function() {
   $('.js-example-basic-single').select2();
    listar_combo_niveles();//LISTA DE GRADOS
    crearidaleatorio();//CREARDO ID ALEATORIO PARA HORARIO
            
    SemstreActualH();//combo semestre
    crearHorarios(); 

    $("#txt_gradoH").change(function(){
        var id= $("#txt_gradoH").val();
        traerCursos_Grado(id);
    });
            
    $("#modal_registro").on('shown.bs.modal',function(){
        $("#txt_usu").focus();  
    })


} );    
           
</script>


