<script type="text/javascript" src="../js/curso.js?rev=<?php echo time();?>"></script>

<div class="col-md-12">
    <div class="box box-warning box-solid">
        <div class="box-header with-border">
              <h3 class="box-title">BIENVENIDO CONTENIDO DEL CURSO</h3>

            <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
            </div>
              <!-- /.box-tools -->
        </div>
            <!-- /.box-header -->
            <div class="box-body">
            <div class="form-group">
                <div class="col-lg-10">
                    <div class="input-group">
                        <input type="text" class="global_filter form-control" id="global_filter" placeholder="Ingresar dato a buscar">
                        <span class="input-group-addon"><i class="fa fa-search"></i></span>
                    </div>
                </div>
                <div class="col-lg-2">
                    <button class="btn btn-danger" style="width:100%" onclick="AbrirModalCurso()"><i class="glyphicon glyphicon-plus"></i>Nuevo Registro</button>
                </div>
            </div>
            <table id="tabla_curso" class="display responsive nowrap" style="width:100%">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Credito</th>
                        <th>Curso Grado</th>
                        <th>Curso Docente</th>
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

                    </tr>
                </tfoot>
            </table>
            </div>
            <!-- /.box-body -->
    </div>
          <!-- /.box -->
</div>


<form autocomplete="false" onsubmit="return false">
    <div class="modal fade" id="modal_regist_curso" role="dialog">
        <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title"><b>Registro De Cursos</b></h4>
            </div>
            <div class="modal-body">

               <div class="col-lg-12">
                  <label>Fecha Registro</label>
                  <div class=" input-group">
                    <div class="input-group-addon">
                      <i class="fa fa-calendar"></i>
                    </div>
                    <input type="text" id="txtfecharegistro" name="txtfecharegistro" readonly style="color: rgb(25,25,51); background-color: rgb(255,255,255);solid 5px;color:#9B0000; text-align:center;font-weight: bold;" class="form-control"><br>
                  </div><br>
              </div>

                <div class="col-lg-12">
                    <label for="">C&oacute;digo</label>
                    <input type="number" class="form-control" id="codigocur" placeholder="Ingrese codigo"><br>
                </div>
                <div class="col-lg-12">
                    <label for="">Nombre</label>
                    <input type="text" class="form-control" id="txt_nom_cur" placeholder="Ingrese nombre"><br>
                </div>
                <div class="col-lg-12">
                    <label for="">Creditos</label>
                    <input type="number" class="form-control" id="txt_cred" placeholder="Ingrese Creditos"><br>
                </div>
               
                <div class="col-lg-12">
                    <label for="">Semestral ♦ Electivo</label>

                     <select class="js-example-basic-single" name="state" id="cbm_sem" style="width:100%;">
                          <option value="">---seleccione---</option>
                          <option value="SEMESTRAL">SEMESTRAL</option>
                           <option value="ELECTIVO">ELECTIVO</option>
                          </select> <br><br>
                </div>

            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="Registrar_curso()"><i class="fa fa-check"><b>&nbsp;Registrar</b></i></button>
                <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-close"><b>&nbsp;Cerrar</b></i></button>
            </div>
        </div>
        </div>
    </div>
</form>

<form autocomplete="false" onsubmit="return false">
    <div class="modal fade" id="modal_editar_curso" role="dialog">
        <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title"><b>Editar curso</b></h4>
            </div>
            <div class="modal-body">
                <div class="col-lg-12">
                    <input type="text" id="txt_id_curso" hidden>
                    <label for="">Codigo</label>
                    <input type="text" class="form-control" id="Codigocurso" ><br>
                </div>
                <div class="col-lg-12">
                    <label for="">Nombre</label>
                    <input type="text" class="form-control" id="Nombreedit" ><br>
                </div>
                <div class="col-lg-12">
                    <label for="">Creditos</label>
                    <input type="number" class="form-control" id="Creditoedit" ><br>
                </div>
               
                <div class="col-lg-12">
                    <label for="">Semestral ♦ Electivo</label>
                    <select class="js-example-basic-single" name="state" id="tipoedit" style="width:100%;">
                          <option value="semestral">SEMESTRAL</option>
                           <option value="electivo">ELECTIVO</option>
                    </select><br><br>
                </div>

            </div><br>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="Actualizar_curso()"><i class="fa fa-check"><b>&nbsp;Registrar</b></i></button>
                <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-close"><b>&nbsp;Cerrar</b></i></button>
            </div>
        </div>
        </div>
    </div>
</form>




<script>
$(document).ready(function() {
     var f = new Date();
  txtfecharegistro.value= f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate();
 
  
    $('.js-example-basic-single').select2();
    listar_curso();
   
   
    $("#modal_regist_curso").on('shown.bs.modal',function(){
        $("#txt_nom_cur").focus();  
    });



} );
</script>