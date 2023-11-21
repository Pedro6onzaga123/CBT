

<script type="text/javascript" src="../js/pago.js?rev=<?php echo time();?>"></script>
<div class="col-md-12">
          <div class="box box-warning box-solid">
          
            <div class="box-header with-border">
              <h3 class="box-title"><b>&nbsp; PAGO DE MENSUALES DE ALUMNOS</b></h3>

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
                <div class="col-lg-10">
                    <div class="input-group">
                        <input type="text" class="global_filter form-control" id="global_filter" placeholder="Ingresar dato a buscar">
                        <span class="input-group-addon"><i class="fa fa-search"></i></span>
                    </div>
                </div>
                
            </div>

            <table id="Tabla_Pagos_Alumno" class="display responsive nowrap" style="width:100%">
                <thead>
                    <tr>
                        <th>Ident</th>
                        <th>Alumno</th>
                        <th>Grado</th>
                        <th>fec-Registro</th>
                        <th>fec-Pago</th>
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
                    </tr>
                </tfoot>
            </table>
          </div>
          <!-- /.box -->
        </div>



<form autocomplete="false" onsubmit="return false">
  <div class="modal fade" id="modad_pagos" role="dialog">
    <div class="modal-dialog">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title"><b>PAGOS DE ALUMNOS</b></h4>
        </div>
        <div class="modal-body">
            <input type="text" name="" id="idalumno" hidden >
            <input type="text" name="" id="Alumno" hidden>
              <!-- Widget: user widget style 1 -->
               <div class="row">
                 <div class="col-md-6">
                       <div class="box box-widget widget-user-2">
                         <div class="widget-user-header bg-widget">
                            <div class="widget-user-image">
                             <img class="img-circle" src="../Plantilla/dist/img/images.png" alt="User Avatar">
                          </div>
                         <h3 class="widget-user-username" id="nombreAlumno">&nbsp;<b></b></h3>
                        <h5 class="widget-user-desc" id="gradoAlumno"></h5>
                       </div>
                     
                   </div>
               </div>
                <div class="col-md-6">
                       <div class="box box-widget widget-user-2">
                         <div class="widget-user-header bg-widget">
                            
                          <div class="box-footer no-padding">
                           <ul class="nav nav-stacked">
                          <label for=""><strong>Ultima vez&nbsp;</strong></label><span class='pull-right label label-success'>Pagado&nbsp;</span>
                              <strong><ul id="fechadeutimopago" ></ul></strong>
                              <input type="text" id="pagadpfer" hidden>
                            </ul>
                         </div>
                       </div>
                                      
                   </div>
               </div>
                 <div class="col-md-6">
                  <div class="mr-auto p-2 d-inline-right align-items-baseline">
                            <center>
                             <label for="">SELECCIONE MES</label>
                                   <select  class="js-example-basic-single" name="state" id="cbm_mes" style="width:100%;">
                                    <option value="">--------</option>
                                    <option  value="1">ENERO</option>
                                     <option value="2">FEBRERO</option>
                                     <option value="3">MARZO</option>
                                     <option value="4">ABRIL</option>
                                     <option value="5">MAYO</option>
                                     <option value="6">JUNIO</option>
                                     <option value="7">JULIO</option>
                                     <option value="8">AGOSTO</option>
                                     <option value="9">SETIEMBRE</option>
                                     <option value="10">OCTUBRE</option>
                                     <option value="11">NOVIEMBRE</option>
                                     <option value="12">DICIEMBRE</option>
                                    
                                     </select><br>
                              </center>
                              
                      </div>
                 </div>
                
                 <div class="col-md-6">
                    <div class="container">
                        <div class="left ">
                          <br>
                               <button class="btn btn-primary" onclick="Agregar_tabla_Pagos()"><i class="glyphicon glyphicon-download-alt">&nbsp; Agregar</button></i>
                               <button class="btn btn-info btn sm" onclick="Refresmodal()"><i class="glyphicon glyphicon-refresh"></button></i>
                     
                      </div>
                      </div>
               </div>

            </div>
           
             <div class=" col-lg-12 table-responsive" ><br>
                       <table id="tabla_detall "style="width: 100%" class="table">
                        <thead class=" thead-drak" bgcolor="orange" style="color: #ffffff">
                           <th>Nro</th>
                           <th>Fechas</th>
                           <th>Costo</th>
                           <th>Quitar</th>
                            </thead>
                           <tbody id="tbody_tabla_detall">   
                          </tbody>
                          <tr>
                                <td> total</td>
                                <td colspan=3 id=""></td>
                                <td colspan=3 id="total"></td>
                              </tr>
                         </table>
                      </div>
        </div>
             <div class="modal-footer">
                <label for="">&nbsp;</label><br>
                <button class="btn btn-primary" onclick="Pagar_Alumno()" ><i class="fa fa-check"><b>&nbsp;Pagar</b></i></button>
                <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-close"><b>&nbsp;Cerrar</b></i></button>
            </div>
      </div>
      
    </div>
  </div>
</form>


<form autocomplete="false" onsubmit="return false">
  <div class="modal fade" id="reporte_pago" role="dialog">
    <div class="modal-dialog">
    
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title"><b>PAGOS REALIZADOS</b></h4>
        </div>
        <div class="modal-body">
            <input type="text" name="reportidalumno" id="idalumno" hidden>
              <!-- Widget: user widget style 1 -->

                 <div class="col-lg-12">
                       <div class="box box-widget widget-user-2">
                         <div class="widget-user-header bg-widget">
                            <div class="widget-user-image">
                             <img class="img-circle" src="../Plantilla/dist/img/images.png" alt="User Avatar">
                          </div>
                         <h3 class="widget-user-username" id="reportnombreAlumno">&nbsp;<b></b></h3>
                        <h5 class="widget-user-desc" id="reportgradoAlumno"></h5>
                       </div>
                   </div>
               </div>
               
               <div class="col-lg-12"><br>
               
                     <table id="tabla_meses_pagado "style="width: 100%" class="table">
                          <thead class=" thead-drak" bgcolor="black" style="color: #ffffff">
                               <tr>
                                   <td>Numero</td>
                                   <td>monto</td>
                                   <td>descripcion</td>
                                    <td>Fech pagados</td>
                                    <td>fecha</td>
                                    <td>estado</td>
                                </tr>
                              </thead>
                           <tbody id="tabla_meses_pagado">   
                          </tbody>
                         </table>
                        
                    
           </div>
        </div>
             <div class="modal-footer">
                <label for="">&nbsp;</label><br>
                <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-close"><b>&nbsp;Cerrar</b></i></button>
            </div>
      </div>
      
    </div>
  </div>
</form>


<script>

$(document).ready(function() {

    $('.js-example-basic-single').select2();
   Comparar_Fecha();
    listar_pagosAlu();
    $("#modal_Matricula").on('shown.bs.modal',function(){
        $("#txt_apellido").focus();  
    })

} );
</script>