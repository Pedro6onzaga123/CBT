

<?php
session_start();
?>
<script type="text/javascript" src="../js/alumno.js?rev=<?php echo time();?>"></script>

<div class="col-md-4">
    <div class="box box-info">
        <div class="box-header with-border">
              <h3 class="box-title"><br>ESTADO DE DEUDAS</br></h3>

             <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
             </div>
              <!-- /.box-tools -->
        </div>
            <!-- /.box-header -->
            <div class="box-body">
            	      <div class="box box-widget widget-user-2">
                         <div class="widget-user-header bg-widget">
                            <div class="widget-user-image">
                             <img class="img-circle" src="../Plantilla/dist/img/images.png" alt="User Avatar">
                          </div>
                          <div>
                           <h3 class="widget-user-username" id="ApellidoAlumno">&nbsp;<b></b></h3>
                           <h5 class="widget-user-desc" id="nombreAlumno"></h5>
                           <h5 class="widget-user-desc" id="gradoAlumno"></h5>
                            <label><b>ultimo pago :&nbsp;</b></label><h4 class="widget-user-username" id="Ultimoaporte">&nbsp;<b></b></h4>
                            <label><b>mes de pago:&nbsp;</b></label><h4 class="widget-user-username" id="mesdepago">&nbsp;<b></b></h4>
                          <label><b>Estado:&nbsp;</b></label> <span class='label label-success' id="estadopago"></span> <span class='label label-danger' id="estadeuda"></span><br>
                         </div>
                       </div>
                     
                   </div>
             </div> <!-- Widget: user widget style 1 -->
              
            <!-- /.box-body -->
    </div>
          <!-- /.box -->
</div>


<div class="col-md-8">
    <div class="box box-info">
        <div class="box-header with-border">
              <h3 class="box-title"><br>BIENVENIDO CONTENIDO DE PAGOS DE PENCION</br></h3>

            <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
            </div>
              <!-- /.box-tools -->
        </div>
            <!-- /.box-header -->
            <div class="box-body">
            <input type="text" id="UserNom" value="<?php echo $_SESSION['S_USER'] ?>" hidden>
            <table id="tabla_pagos" class="display responsive nowrap" style="width:100%">
                <thead>
                    <tr>
                        <th>Monto</th>
                        <th>descripcion</th>
                        <th>Meses pagados</th>
                        <th>Fech accion</th>
                        <th>Estatus</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
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
$(document).ready(function() {
 
 estadi_deudasAlum();
 
//pagos_penciones();

} );
</script>
