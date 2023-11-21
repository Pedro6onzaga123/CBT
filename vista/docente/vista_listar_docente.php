
<script type="text/javascript" src="../js/docente.js?rev=<?php echo time();?>"></script>
<script type="text/javascript" src="../js/index.js?rev=<?php echo time();?>"></script>
<div class="col-md-8">
    <div class="box box-warning box-solid">
        <div class="box-header with-border">
              <h3 class="box-title">BIENVENIDO AL CONTENIDO DEL DOCENTES</h3>

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
                    <button class="btn btn-danger" style="width:100%" onclick="AbrirModalDocente()"><i class="glyphicon glyphicon-plus"></i>Nuevo Registro</button>
                </div>
             </div>
            <table id="tabla_Docentes" class="display responsive nowrap" style="width:100%">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NOMBRE</th>
                        <th>APELLIDOS</th>
                        
                        <th>TIPO</th>
                       
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
                <table id="tablasAsignados" class="display responsive nowrap" style="width:100%" hidden>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Curso</th>
                        <th>Grado</th>
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

<form autocomplete="false" onsubmit="return false">
    <div class="modal fade" id="modal_registro_docente" role="dialog">
        <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title"><b>Registro De Docentes</b></h4>
            </div>
            <div class="modal-body">
                <div class="col-lg-12">
                    <label for="">Nombres</label>
                    <input type="text" class="form-control" id="txt_nombre" placeholder="Ingrese usuario">
                </div>
                <div class="col-lg-12">
                    <label for="">Apellidos</label>
                    <input type="text" class="form-control" id="txt_app" placeholder="Ingrese usuario">
                </div>

                 <div class="col-lg-12">
                    <label for="">Dni</label>
                    <input type="number" class="form-control" id="dnidoce" placeholder="ingreae DNI">

                </div>

                <div class="col-lg-12">
                    <label for="">Contrase&ntilde;a</label>
                    <input type="password" class="form-control" id="txt_con1" placeholder="Ingrese contrase&ntilde;a">
                </div>
                <div class="col-lg-12">
                    <label for="">Repita la Contrase&ntilde;a</label>
                    <input type="password" class="form-control" id="txt_con2" placeholder="Repita contrase&ntilde;a">
                </div>
                
                <div class="col-lg-12">
                    <label for="">Sexo</label>
                    <select class="js-example-basic-single" name="state" id="cbm_sexo" style="width:100%;">
                        <option value="M">MASCULINO</option>
                        <option value="F">FEMENINO</option>
                    </select><br><br>
                </div>
                <div class="col-lg-12">
                    <label for="">Tipo </label>
                    <select class="js-example-basic-single" name="state" id="cbm_tipo" style="width:100%;">
                        <option value="CONTRATADO">CONTRATADO</option>
                        <option value="NOMBRADO">NOMBRADO</option>
                    </select><br><br>
                </div>

            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="Registrar_Docente()"><i class="fa fa-check"><b>&nbsp;Registrar</b></i></button>
                <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-close"><b>&nbsp;Cerrar</b></i></button>
            </div>
        </div>
        </div>
    </div>
</form>

<!-- The Modal -->
<form autocomplete="false" onsubmit="return false">
  <div class="modal fade" id="modal_agregar_curso">
    <div class="modal-dialog">
      <div class="modal-content">
      
        <!-- Modal Header -->
        <div class="modal-header">
         <center> <h4 class="modal-title"><b>ASIGNANDO CURSOS AL DOCENTE</b></h4>
         </center>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        
        <!-- Modal body -->
        <div class="modal-body">
         <div class="row ">

              <div class="col-lg-6">
                   <label for="">SEMESTRE</label>
                    <select class="js-example-basic-single" name="state" id="profSemestGrad" style="width:100%;" disabled>
                    </select><br><br>
                  
                </div>
         
             <div class="col-lg-6">
              <input type="text" name="" id="txtiddocente" hidden>
                    <label for="">GRADOS</label>
                    <select class="js-example-basic-single" name="state" id="cbm_nivel" style="width:100%;">
                    </select><br><br>
                </div> 
               
                 <div class="col-lg-6">
                   <label for="">CURSOS </label>
                    <select class="js-example-basic-single" name="state" id="cbm_curso" style="width:100%;">
                    </select><br><br>
                  
                </div> 
                <div class="col-lg-8">
                    <label for="">LISTA DE ASIGNATURAS</label>
                </div>

                <div class="col-lg-4">
                    <button class="btn btn-primary" onclick="Agregar_tabla()"><i class="glyphicon glyphicon-download-alt">&nbsp; Agregar</button></i>
                </div>

                     <div class=" col-lg-12 table-responsive" ><br>
                       <table id="tabla_detall "style="width: 100%" class="table table-dark">
                        <thead class=" thead-drak" bgcolor="black" style="color: #ffffff">
                          <th>ID</th>
                           <th>CURSOS</th>
                           <th>ID</th>
                           <th>NIVELES</th>
                           <th>QUITAR</th>
                            </thead>
                           <tbody id="tbody_tabla_detall">   
                          </tbody>
                         </table>
                      </div>
            </div>
          </div>
        <!-- Modal footer -->
        <div class="modal-footer">
                <button class="btn btn-primary" onclick="DocentAsignado()" ><i class="fa fa-check"><b>&nbsp;Registrar</b></i></button>
                <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-close"><b>&nbsp;Cerrar</b></i></button>
            </div>
        
      </div>
    </div>
  </div>
</div>
</form>

<!-- The Modal -->
<form autocomplete="false" onsubmit="return false">
  <div class="modal fade" id="modal_ver_curso">
    <div class="modal-dialog">
      <div class="modal-content">
      
        <!-- Modal Header -->
        <div class="modal-header">
         <center> <h4 class="modal-title"><b> CURSOS ASIGNADOS</b></h4></center>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
         <input type="text" name="" id="textiddocenteV" hidden>
        <!-- Modal body -->
        <div class="modal-body">
                <style>
               .modal-body{  height: 100%; } .loader{display: none; }</style><div class="loader"><img src="abc.gif" alt="" style="width: 50px;height:50px;"></div>

                    <div class="col-lg-12">
                       <div class=" table-responsive" ><br>
                             <table id="tabla_cursogrado_docent "style="width: 100%" class="table">
                                  <thead class=" thead-drak" bgcolor="black" style="color: #ffffff">
                                           <td>Numero</td> 
                                            <td>Cursos</td> 
                                            <td>Grados</td>
                                           <td>Quitar</td> 
                                        </tr>
                                   <tbody id="tabla_cursogrado_docent">   
                                  </tbody>
                            </table>
                        
                        </div>
                   </div>
        </div>

         
        <!-- Modal footer -->
        <div class="modal-footer">
              
                <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-close"><b>&nbsp;Cerrar</b></i></button>
            </div>
        
      </div>
    </div>
  </div>
</div>
</form>


<form autocomplete="false" onsubmit="return false">
    <div class="modal fade" id="docente_edit" role="dialog">
        <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title"><b>UPDATE DOCENTE</b></h4>
            </div>
            <div class="modal-body">
               <input type="text"  id="id_docent" hidden>
                <div class="col-lg-12">
                    <label for="">Usuario</label>
                    <input type="text" class="form-control" id="docentenom" placeholder="Ingrese usuario"><br>
                </div>
                <div class="col-lg-12">
                    <label for="">Apellidos</label>
                    <input type="text" class="form-control" id="appdocent" placeholder="Ingrese usuario"><br>
                </div>
                 
                 <div class="col-lg-12">
                     <label for="">Estado</label>
                    <select class="js-example-basic-single" name="state" id="statusdocent" style="width:100%;">
                       <option value="ACTIVO">ACTIVO</option>
                        <option value="INACTIVO">INACTIVO</option>
                        
                    </select><br><br>
                </div>
                <div class="col-lg-12">
                    <label for="">Sexo</label>
                    <select class="js-example-basic-single" name="state" id="docentsex" style="width:100%;">
                        <option value="M">MASCULINO</option>
                        <option value="F">FEMENINO</option>
                    </select><br><br>
                </div>
                <div class="col-lg-12">
                    <label for="">Tipo </label>
                    <select class="js-example-basic-single" name="state" id="tipodocebt" style="width:100%;">
                        <option value="CONTRATADO">CONTRATADO</option>
                        <option value="NOMBRADO">NOMBRADO</option>
                    </select><br><br>
                </div>

            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="Update_Docente()"><i class="fa fa-check"><b>&nbsp;Registrar</b></i></button>
                <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-close"><b>&nbsp;Cerrar</b></i></button>
            </div>
        </div>
        </div>
    </div>
</form>





<script>
$(document).ready(function() {
    listar_docente();
     SemstreActual();//esta en index.js==> cargar semestre actual
    $('.js-example-basic-single').select2();
    
    $("#modal_registro_docente").on('shown.bs.modal',function(){
        $("#txt_usu").focus();  
    })

    $('#cbm_nivel').change(function(){//se ejecuta la funcion
     var idnivel= $('#cbm_nivel').val();
                Traer_cursos(idnivel);
               
   }) 
} );
</script>
