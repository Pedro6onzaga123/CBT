
<script type="text/javascript" src="../js/horario.js?rev=<?php echo time();?>"></script>


<div class="col-md-8">
    <div class="box box-warning box-solid">
        <div class="box-header with-border">
              <h3 class="box-title">LISTA DE HORARIOS </h3>

            <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
            </div>
              <!-- /.box-tools -->
        </div>
             <!-- /////////// -->
    
            <!-- /.box-header -->
            <div class="box-body">
            <div class="form-group">
                <div class="col-lg-9">
                    <div class="input-group">
                        <input type="text" class="global_filter form-control" id="global_filter" placeholder="Ingresar dato a buscar">
                        <span class="input-group-addon"><i class="fa fa-search"></i></span>
                    </div>
                </div>
                <div class="col-lg-3">
                    <button class="btn btn-danger" style="width:100%" onclick="cargar_contenido('contenido_principal','horario/vista_crear_horario.php')"><i class="glyphicon glyphicon-plus"></i>Nuevo Horario</button>
                </div>
            </div>
            <table id="tabla_horarios" class="display responsive nowrap" style="width:100%">
                 <style>
               table,thead{  height: 100%; } .loader{display: none; }</style>

                                     <div class="loader">
                                      <img src="abc.gif" alt="" style="width: 50px;height:50px;">
                                      </div>
                <thead>
                    <tr>
                        <th>ID-HORARIO</th>
                        <th>Grado</th>
                        <th>Stado</th>
                        <th>Acci&oacute;n</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                         
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

<div class="col-md-4">
    <div class="box box-info">
        <div class="box-header with-border">
              <h3 class="box-title">Comentarios</h3>

            <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
            </div>
              <!-- /.box-tools -->
        </div>
            <!-- /.box-header -->
            <div class="box-body">
            <div class="form-group">
            
                <div class="nav-tabs-custom">
           
              <!-- /.tab-pane -->
              <div class="tab-pane active" id="timeline">
                <!-- The timeline -->
                <ul class="timeline timeline-inverse">
                  <!-- timeline time label -->
                  <li class="time-label">
                        <span class="bg-red">
                          2021
                        </span>
                  </li>
                  <li>
                    <i class="fa fa-envelope bg-blue"></i>

                    <div class="timeline-item">
                      <span class="time"><i class="fa fa-clock-o"></i> 12:05</span>

                      <h3 class="timeline-header"><a href="#">paso 1</a> seleccione cursos</h3>

                      <div class="timeline-body">
                        cursos de acuerdo que se planeo para cada grado
                      </div>
                      
                    </div>
                  </li>
                  <li>
                    <i class="fa fa-user bg-aqua"></i>

                    <div class="timeline-item">
                      <span class="time"><i class="fa fa-clock-o"></i></span>

                      <h3 class="timeline-header no-border"><a href="#">paso 2</a> 
                        arraste el curso al los casillelos de la tabla
                      </h3>
                      <div class="timeline-body">
                        seleccione primero el grado que deseas registrar sus horario..! 
                      </div>
                    </div>
                  </li>
                  <li>
                    <i class="fa fa-comments bg-yellow"></i>

                    <div class="timeline-item">
                      <span class="time"><i class="fa fa-clock-o"></i> </span>

                      <h3 class="timeline-header"><a href="#">paso 3</a> los cursos se listaran con ninguna restricciones</h3>

                      <div class="timeline-body">
                        cuando estes creando el horario no trates de cambiar de grado, por que con el ultimo grado que secionaste pasara a registrarte .
                      </div>
                    </div>
                  </li>
                  <li class="time-label">
                        <span class="bg-green">
                         
                        </span>
                  </li>
                  <li>
                    <i class="fa fa-camera bg-purple"></i>

                    <div class="timeline-item">
                      <span class="time"><i class="fa fa-clock-o"></i></span>

                      <h3 class="timeline-header"><a href="#">paso 4</a> ups!</h3>

                      <div class="timeline-body">
                        selecciones cuantos cursos que deseas y arraste a la tabla
                      </div>
                    </div>
                  </li>
                  <!-- END timeline item -->
                  <li>
                    <i class="fa fa-clock-o bg-gray"></i>
                  </li>
                </ul>
              </div>
            </div>
          </div>
                 
               
            </div>
            
            </div>
            <!-- /.box-body -->
    </div>
          <!-- /.box -->
</div>

<form autocomplete="false" onsubmit="return false">
<div class="modal fade" id="modalHhorario">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title"><b>HORARIO</b></h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>                

        <!-- Modal body -->
           <?php  include_once '../../modelo/modelo_horario.php';
            $ddd  = new  Horario(); 
            
            $horas  =  $ddd-> ListarHoras();

            ?>
        <div class="modal-body">
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
                                        $datoscursos = $ddd->ConsultarHorario($c, $hora['idhora']);
                                        if (count($datoscursos) > 0) {
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
        
        <!-- Modal footer -->
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
        
      </div>
    </div>
  </div>
</form>

<script>
$(document).ready(function() {
    listar_Horarios();
    

    $('.js-example-basic-single').select2();
  
    $("#modal_registro").on('shown.bs.modal',function(){
        $("#txt_usu").focus();  
    })
 

} );
</script>





    

