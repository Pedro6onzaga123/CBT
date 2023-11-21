<script type="text/javascript" src="../js/administrador.js?rev=<?php echo time();?>"></script>
<div class="col-md-12">
          <div class="box box-warning box-solid">
          
            <div class="box-header with-border">
              <h3 class="box-title">BIENVENIDO AL CONTENIDO DE MATRICULAS</h3>

              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
              </div>
              <!-- /.box-tools -->
            </div>
            <!-- /.box-header -->
            <div class="box-body">
         
            </div>
            <!-- /.box-body -->
            <div class="box-body">
            <div class="form-group">
               <div class="col-lg-2">
                 <button class="btn btn-danger" style="width:100%" onclick="AbrirModalMatricula()"><i class="glyphicon glyphicon-plus"></i>&nbsp;Nueva Matr&iacute;cula</button>
                    
                </div>
                <div class="col-lg-8">

                  <div class="input-group">
                        <input type="text" class="global_filter form-control" id="global_filter" placeholder="Ingresar dato a buscar">
                        <span class="input-group-addon"><i class="fa fa-search"></i></span>
                    </div>

                   
                </div>
                <div class="col-lg-2">
                
                    <div class="input-group" id="btn-place"></div> 
                </div>
              


            </div>


            <table id="tabla_matricula" class="display responsive nowrap" style="width:100%">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Apellidos</th>
                        <th>Nombres</th>
                        <th>Grado</th>
                        <th>Sexo</th>
                        <th>Matricula</th>
                        <th>Estado</th>
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
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>
          </div>
          <!-- /.box -->
        </div>


  <form autocomplete="false" onsubmit="return false">
  <div class="modal fade" id="modal_Matricula">
    <div class="modal-dialog">
      <div class="modal-content">
      
        <!-- Modal Header -->
        <div class="modal-header">
         <center> <h4 class="modal-title"><b>MATRICULA</b></h4></center>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        
        <!-- Modal body -->
        <div class="modal-body">
         <input type="text" name="" id="idgrupoLiqu" hidden>
           <div class="col-md-12">
          <!-- Custom Tabs -->
            <div class="nav-tabs-custom">
            <ul class="nav nav-tabs">
              <li class="active"><a href="#tab_1" data-toggle="tab" aria-expanded="true">ALUMNO</a></li>
            </ul>
            <div class="tab-content">
              <div class="tab-pane active" id="tab_1">
                     <div class="row">
                        <div class="col-lg-4">
                        <label for="">Apellidos</label>
                         <input type="text" class="form-control" id="txt_apellidos" placeholder="Apellidos" ><br>
                          </div>
                          <div class="col-lg-4">
                        <label for="">Nombres</label>
                         <input type="text" class="form-control" id="txt_alunombre" placeholder="Ingrese Nombres" ><br>
                          </div>
                          <div class="col-lg-4">
                        <label for="">Fecha de Nacimiento</label>
                         <input type="datetime-local" class="form-control" id="txt_fech"  ><br>
                          </div>

                          <div class="col-lg-4">
                        <label for="">CURP</label>
                         <input type="text" class="form-control" id="txt_dni" placeholder="Ingrese Dni" ><br>
                          </div>

                         <div class="col-lg-4">
                        <label for="">Tel&eacute;fono</label>
                         <input type="text" class="form-control" id="txt_tel" placeholder="Ingres Tlef" ><br>
                          </div>

                         <div class="col-lg-4">
                        <label for="">Direcci&oacute;n</label>
                         <input type="text" class="form-control" id="direccion" placeholder="Ingrese Drec"><br>
                          </div>

                          <div class="col-lg-4">
                        <label for="">Pago de matr&iacute;cula</label>
                         <input type="number" class="form-control" id="txt_pago" placeholder="s/." ><br>
                          </div>
                          <div class="col-lg-4">
                           <label for="">Matricula</label>
                             <input type="text" class="form-control" id="txt_codig" placeholder="Ingrese Matricula" ><br>
                          </div>

                         

                    <div class="col-lg-4">
                  <label>Fecha Registro</label>
                  <div class=" input-group">
                        <div class="input-group-addon">
                      <i class="fa fa-calendar"></i>
                       </div>
                      <input type="text" id="txtfecharegistro" name="txtfecharegistro" readonly style="color: rgb(25,25,51); background-color: rgb(255,255,255);solid 5px;color:#9B0000; text-align:center;font-weight: bold;" class="form-control"><br>
                         </div><br>
                    </div>
                     <div class="col-lg-4">
                           <label for="">Contraseña</label>
                             <input type="password" class="form-control" id="contra" placeholder="Password" ><br>
                          </div>

                    <div class="col-lg-4">
                    <label for="">Sexo</label>
                    <select class="js-example-basic-single" name="state" id="cbm_sexo"  style="width:100%;">
                        <option value="M">MASCULINO</option>
                        <option value="F">FEMENINO</option>
                    </select><br><br>
                   </div>

                          <div class="col-lg-4">
                    <label for="">Grado</label>
                    <select class="js-example-basic-single" name="state" id="cbm_grado" style="width:100%;" >
                        
                    </select><br><br>
                   </div>

                      </div>
                   
                 
              
               <div class="modal-footer">
                <button class="btn btn-primary" onclick="matriculaAlunos()"><i class="fa fa-check"><b>&nbsp;Registrar</b></i></button>
                <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-close"><b>&nbsp;Cerrar</b></i></button>
            </div>
              </div>
              <!-- /.tab-pane -->
              </div><!-- /.fin tab #3 -->
              <!-- /.tab-pane -->
            </div>
            <!-- /.tab-content -->
          </div>
          <!-- nav-tabs-custom -->
        </div>

       </div>

        <!-- Modal footer -->
        <div class="modal-footer">
               
            </div>
        
      </div>
    </div>
  </div>
  
</div>
</form>


<!---EDITAR
<form autocomplete="false" onsubmit="return false">
<div class="modal fade" id="edit_modalalum" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
            <div class="col-lg-6">
                    <input type="text"id="textidususrio" name="" hidden>
                    <label for="">Nombre</label>
                    <input type="text" class="form-control" id="nombreedir" placeholder="Ingrese nombre"><br>
                </div>
                <div class="col-lg-6">
                    <label for="">Apellidos</label>
                    <input type="text" class="form-control" id="apelliedit" placeholder=""><br>
                </div>
                <div class="col-lg-6">
                    <label for="">Grado</label>
                    <input type="text" class="form-control" id="gradoedit" placeholder="Ingrese nombre"><br>
                </div>
                <div class="col-lg-6">
                    <label for="">Sexo</label>
                    <input type="text" class="form-control" id="secxoedit" placeholder="Ingrese nombre"><br>
                </div>
                

       
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
</form>--->



<script>

$(document).ready(function() {

  var f = new Date();
  txtfecharegistro.value= f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate()+ " " 
                          + f.getHours()  + ":" + f.getMinutes()  + ":" + f.getSeconds();

    $('.js-example-basic-single').select2();
    listar_alumnos();

    
    $("#modal_Matricula").on('shown.bs.modal',function(){
        $("#txt_apellido").focus();  
    })

} );
</script>