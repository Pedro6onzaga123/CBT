<script type="text/javascript" src="../js/grado.js?rev=<?php echo time();?>"></script>
<script type="text/javascript" src="../js/index.js?rev=<?php echo time();?>"></script>

<div class="col-md-8">
    <div class="box box-warning box-solid">
        <div class="box-header with-border">
              <h3 class="box-title">GETION DE GRADOS</h3>

            <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
            </div>
              <!-- /.box-tools -->
        </div>
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
                    <button class="btn btn-danger" style="width:100%" onclick="AbrirModalGrado()"><i class="glyphicon glyphicon-plus"></i>Nuevo Registro</button>
                </div>
            </div>
            <table id="tabla_grados" class="display responsive nowrap" style="width:100%">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Grado</th>
                        <th>Aula</th>
                        <th>Seccion</th>
                        <th>Vacantes</th>
                       
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
                    </tr>
                </tfoot>
            </table>
            </div>
            <!-- /.box-body -->
    </div>
          <!-- /.box -->
</div>

<div class="col-md-4">
    <div class="box box-warning">
        <div class="box-header with-border">
              <h3 class="box-title">CURSOS ASIGNADOS</h3>

            <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
            </div>
              <!-- /.box-tools -->
        </div>
            <!-- /.box-header -->
            <div class="box-body">
            <div class="form-group">
                
                <table id="tablagardocurso" class="display responsive nowrap" style="width:100%" hidden>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>C&oacute;digo</th>
                        <th>curso</th>
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
            
            </div>
            <!-- /.box-body -->
    </div>
          <!-- /.box -->
</div>


<form autocomplete="false" onsubmit="return false" >
    <div class="modal fade" id="modal_agregar_curso" role="dialog">
        <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title"><b>A&ntilde;dir  Cursos - Grado</b></h4>
            </div>
            <div class="modal-body">

                 <div class="col-lg-12">
                    <input type="text" name="" id="text_idgrado" hidden>
                    
                    <label for="">Semestre</label>
                     <select class="js-example-basic-single" name="state" id="gradSemt" style="width:100%;color: rgb(25,25,51); background-color: rgb(255,255,255);solid 5px;color:#9B0000; text-align:center;font-weight: bold;" disabled>
                    </select><br><br>
                     </div>
                     <div class="col-lg-12" style="border-color: #f5c6cb;">
                        <div id="avisomanual" class="alert  sm" role="alert" style="color: #721c24; background-color: #f8d7da;">
                              !seleccione un curso!
                              en seguida precione en:
                              &nbsp;&nbsp;<span class='label label-warning'><i class="glyphicon glyphicon-plus "></i></span>    
                        </div>
                     </div>
                 <div class="col-lg-12">
                    <label for="">Cursos</label>
                    <select class="js-example-basic-single" name="state" id="cbm_curso" style="width:100%;">
                    </select><br><br>
                </div><br>
                 

                <div class="col-lg-12">
                    <button class="btn btn-block btn-warning" style="width:100%" onclick="Cursos_Select()"><i class="glyphicon glyphicon-plus "></i>Cursos</button>
                </div>


                <div class=" col-lg-12 table-responsive" ><br>
                       <table id="tabla_lista_curso"  style="width:100%" class="table">
                        <thead class=" thead-drak" bgcolor="sky blue" style="color: #ffffff">
                          <th>ID</th>
                           <th>Nombre</th>
                           <th>Quitar</th>
                            </thead>
                           <tbody id="tbody_tabla_lista_curso">   
                          </tbody>
                         </table>
                      </div>    

            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="Registrar_Cursogrado()"><i class="fa fa-check"><b>&nbsp;Registrar</b></i></button>
                <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-close"><b>&nbsp;Cerrar</b></i></button>
            </div>
        </div>
        </div>
    </div>
</form>



<form autocomplete="false" onsubmit="return false">
    <div class="modal fade" id="modal_regist_grado" role="dialog">
        <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title"><b>Registro De Grado</b></h4>
            </div>
            <div class="modal-body">
                <input type="hidden" name="" id="id">
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
                    <label for="">Grado</label>
                    <input type="tx
                    " class="form-control" id="txt_nom" placeholder=" Nivel"><br>
                </div>
                <div class="col-lg-12">
                    <label for="">vacantes</label>
                    <input type="number" class="form-control" id="vacantes" placeholder="N°"><br>
                </div>
               
                <div class="col-lg-12">
                    <label for="">Semestre</label>
                    <select class="js-example-basic-single" name="state" id="cbm_semestre" style="width:100%;" disabled>
                        
                    </select><br><br>
                </div>
              
                <div class="col-lg-12">
                
                    <label for="">Seleccionar aula</label>
                    <select class="js-example-basic-single" name="state" id="cbm_aula" style="width:100%;">
                    </select><br><br>
               
                </div>
                </div><br>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="Registrar_Grado()"><i class="fa fa-check"><b>&nbsp;Registrar</b></i></button>
                <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-close"><b>&nbsp;Cerrar</b></i></button>
            </div>
        </div>
        </div>
    </div>
</form>

<form autocomplete="false" onsubmit="return false">
    <div class="modal fade" id="modaupdate_grado" role="dialog">
        <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title"><b>Editat grado</b></h4>
            </div>
            <div class="modal-body">
                     <input type="text "  id="idGrado" hidden>
                <div class="col-lg-12">
                    <label for="">Grado</label>
                    <input type="text " class="form-control" id="nom_edit" placeholder="nobre_edit"><br>
                </div>

                <div class="col-lg-12">
                    <label for="">vacantes</label>
                    <input type="text" class="form-control" id="edit_vacante" placeholder="num_edit"><br>
                </div>

                <div class="col-lg-12">
                    <label for="">Aula</label>
                    <input type="text" class="form-control" id="edit_aula" placeholder="num_edit" disabled><br>
                </div>
                <div class="col-lg-12">
                    <label for="">Seccion</label>
                    <input type="text" class="form-control" id="seccion_edit" placeholder="num_edit" disabled><br>
                </div>

                  <div class="col-lg-12">
                    <label for="">Estado</label>
                    <select class="js-example-basic-single" name="state" id="estado_edit" style="width:100%;">
                        <option value="">--selecione estado--</option>
                        <option value="ACTIVO">ACTIVO</option>
                        <option value="INACTIVO">INACTIVO</option>
                    </select><br><br>
                </div>

                </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="Update_Grado()"><i class="fa fa-check"><b>&nbsp;Registrar</b></i></button>
                <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-close"><b>&nbsp;Cerrar</b></i></button>
            </div>
        </div>
        </div>
    </div>
</form>


<form autocomplete="false" onsubmit="return false">
<div class="modal fade" id="verGrado_Curso" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
           <h4 class="modal-title"><b>GRADO && CURSO</b></h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
          <style>
               .modal-body{  height: 100%; } .loader{display: none; }</style><div class="loader"><img src="abc.gif" alt="" style="width: 50px;height:50px;"></div>

                    <div class="col-lg-12">
                       <div class=" table-responsive" ><br>
                             <table id="tabla_curso_grado "style="width: 100%" class="table">
                                  <thead class=" thead-drak" bgcolor="black" style="color: #ffffff">
                                          <td>N&uacute;mero</td>
                                           <td>C&oacute;digo</td> 
                                           <td>Curso</td>   
                                           <td>Quitar</td>

                                        </tr>
                                   <tbody id="tabla_curso_grado">   
                                  </tbody>
                            </table>
                        
                        </div>
                   </div>
      </div>
       <div class="modal-footer">
                <label for="">&nbsp;</label><br>
                <button   type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-close"><b>&nbsp;Cerrar</b></i></button>
            </div>
    </div>
  </div>
</div>
</form>



<script>
$(document).ready(function() {
    $('.js-example-basic-single').select2();


    SemstreActual();//esta en index.js==> cargar semestre actual
        var f = new Date();
  txtfecharegistro.value= f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate()+ " " + f.getHours();

    listar_grados() ;
    $("#modal_registro_docente").on('shown.bs.modal',function(){
        $("#txt_usu").focus();  
    })

} );
</script>



          