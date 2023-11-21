
<script type="text/javascript" src="../js/gra_docent.js?rev=<?php echo time();?>"></script>
<div class="col-md-6">
    <div class="box box-info">
        <div class="box-header with-border">
              <h3 class="box-title">GRADOS ASIGNADOS</h3>

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
            <table id="grados_table" class="display responsive nowrap" style="width:100%">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Grados</th>
                        <th>cant Alum</th>
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
<div class="col-md-6" id="divcursosdelgraro" hidden>
    <div class="box box-info">
        <div class="box-header with-border">
              <h3 class="box-title"><b>CURSOS PERTENECIENTES AL  <label id="nombregrado"></label></b></h3>

            <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
            </div>
              <!-- /.box-tools -->
        </div>
            <!-- /.box-header -->
            <div class="box-body">
           
            <input type="text" name="idgrado" id="idgrado" hidden>
            

            <table id="cursos_table" class="display responsive nowrap" style="width:100%" hidden>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Cuso</th>
                        <th>Acci&oacute;n</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
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


<!--hhhhhhhhhhhhhhhhhh-->
<div class="col-md-12" id="divAlumnos" hidden>
    <div class="box box-info">
        <div class="box-header with-border">
              <h3 class="box-title"><b>ALUMNOS MATRICULADOS EN EL CURSO DE : <label id="nombreCurso"></label></b></h3>

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
                    <button class="btn " style="width:100%;background-color: #05ccc4" onclick="Reporte_Notas()"><i class="fa fa-cloud-download " style="color: #ffffff"></i></button>
                </div>
            </div>
            <input type="text" name="idcurso" id="idcurso" hidden>
            <table id="alumnos_del_curso" class="display responsive nowrap" style="width:100%" hidden>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Nombres</th>
                         <th>Apellidos</th>
                         
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

<div class="col-md-12" id="DivReportes" hidden>
    <div class="box box-secondary">
        <div class="box-header with-border">
              <h3 class="box-title"><b>REPORTES DE NOTAS</b></h3>
            <div class="box-tools pull-right">
               
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
                    <button class="btn" style="width:100%;background-color: #05ccc4"  onclick="Reporte_regres()"><i class="fa  fa-close" style="color: #ffffff"></i></button>
                </div>
            </div>
            
            <table id="reportExel" class="display responsive nowrap" style="width:100%">
                <thead>
                    <tr>
                        
                         <th>Apellidos</th>
                         <th>Nombres</th>
                         <th>Grado</th>
                         <th>Curso</th>
                         <th>Pract N° 1</th>
                         <th>Pract N° 2</th>
                         <th>Pract N° 3</th>
                         <th>Pract N° 4</th>
                         <th>Trabj N° 1</th>
                         <th>Trabj N° 2</th>
                         <th>Trabj N° 3</th>
                         <th>Trabj N° 4</th>
                         <th>Parcl N° 1</th>
                         <th>Parcl N° 2</th>
                         <th>Parcl N° 3</th>
                         <th>Parcl N° 4</th>
                         <th>Exam N° 1</th>
                         <th>Exam N° 2</th>
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
                        <th></th>
                        <th></th>
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
            <!-- /.box-body -->
    </div>
          <!-- /.box -->
</div>





<form autocomplete="false" onsubmit="return false">
  <div class="modal fade" id="modal_registro_notas" style="border-radius: 5px">
    <div class="modal-dialog">
      <div class="modal-content">
      
        <!-- Modal Header -->
        <div class="modal-header">
        <h4 class="modal-title"><b><i class='fa fa-edit'></i>&nbsp;ASIGNANDO NOTAS</b></h4>
         
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        
        <!-- Modal body -->
        <div class="modal-body">
         <div class="row ">
            <input type="text" name="" id="idalumno" hidden>
            
              <div class="col-lg-6" style="display: flex;">
                   <label for="">Alumno:</label>
                    <h4 class="widget-user-username" id="nombreAlumno">&nbsp;</h4>
               </div>
                <div class="col-lg-12">
                   <div id="incorecto" class="alert alert-info sm" role="alert" hidden>
                    No se permiten mas notas!
                     </div>
                    
               </div> 

                <div class="col-lg-12">
                   <label for="">Pr&aacute;cticas</label>&nbsp;<span class='label label-success'>&nbsp;20%</span>
                   <a class="btn btn-success btn-circle btn-sm" onclick="Addnotas()">
                     <span class="fa fa-plus-circle" aria-hidden="true"></span>
                     </a>
                    
               </div>  
               
                <div class="col-lg-5">
                   <label for="">Práctica 1:</label>
                   <input type="number" class="form-control" id="practica1" style="border-radius: 5px" ><br>
                    
               </div>
                <div class="col-lg-5">
                   <label for="">Práctica 2:</label>
                   <input type="number" class="form-control" id="practica2"  style="border-radius: 5px"><br>
                   
               </div>
                    <div id="dynamicDiv"></div><br>

                <div class="col-lg-12">
                   <label for="">Trabajos</label>&nbsp;<span class='label label-success'>&nbsp;20%</span>
                   <a class="btn btn-primary btn-circle btn-sm" onclick="Addtrabajo()">
                     <span class="fa fa-plus-circle" aria-hidden="true"></span>
                     </a>
                    
               </div>

               <div class="col-lg-5">
                   <label for="">Trabajo 1:</label>
                   <input type="number" class="form-control" id="trabajo1"  style="border-radius: 5px"><br>
                    
               </div>
                <div class="col-lg-5">
                   <label for="">Trabajo 2:</label>
                   <input type="number" class="form-control" id="trabajo2"  style="border-radius: 5px"><br>
                   
               </div>

               <div id="divtrabajo"></div>
            

               <div class="col-lg-12">
                   <label for="">Parciales</label>&nbsp;<span class='label label-success'>&nbsp;20%</span>
                   <a class="btn btn-warning btn-circle btn-sm" onclick="AddParcial()">
                     <span class="fa fa-plus-circle" aria-hidden="true"></span>
                     </a>
                    
               </div>

               <div class="col-lg-5">
                   <label for="">Parcial 1:</label>
                   <input type="number" class="form-control" id="parcial1"  style="border-radius: 5px"><br>
                    
               </div>
                <div class="col-lg-5">
                   <label for="">Parcial 2:</label>
                   <input type="number" class="form-control" id="parcial2"  style="border-radius: 5px"><br>
                   
               </div>

               <div id="divparcial"></div>

               <div class="col-lg-6">
                    <label for="">Exsamen</label><span class='label label-success'>&nbsp;MC-20%</span>
                    <input type="number" class="form-control" id=exsamen1 style="border-radius: 5px"><br>
                </div>
                <div class="col-lg-6">
                    <label for="">Exsamen</label><span class='label label-success'>&nbsp;EF-20%</span>
                    <input type="number" class="form-control" id="exsamen2" style="border-radius: 5px"><br>
                </div>
            

          </div>
        <!-- Modal footer -->
        <div class="modal-footer">
                <button class="btn btn-primary" onclick="Registro_notas()" ><i class="fa fa-check"><b>&nbsp;Registrar</b></i></button>
                <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-close"><b>&nbsp;Cerrar</b></i></button>
            </div>
        
      </div>
    </div>
  </div>
</div>
</form>



<form autocomplete="false" onsubmit="return false">
  <div class="modal fade" id="modal_editar_notas" style="border-radius: 5px">
    <div class="modal-dialog">
      <div class="modal-content">
      
        <!-- Modal Header -->
        <div class="modal-header">
        <h4 class="modal-title"><b><i class='fa fa-edit'></i>&nbsp;ACTUALIZAR  NOTAS</b></h4>
         
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        
        <!-- Modal body -->
        <div class="modal-body">
         <div class="row ">
            <input type="text" name="" id="edit_idalumno"  hidden>
             <input type="text" name="" id="id_tablenota"  hidden>
            
              <div class="col-lg-6" style=" display: flex;">
                   <label for="">Alumno :</label>
                    <h4 class="widget-user-username" id="edit_nombreAlumno">&nbsp;</h4>
               </div>
                <div class="col-lg-12">
                   <div id="edit_incorecto" class="alert alert-info sm" role="alert" hidden>
                    No se permiten mas notas!
                     </div>
                    
               </div> 
 
             
                <div class="col-lg-12">
                   <label for="">Pr&aacute;cticas</label>&nbsp;<span class='label label-success'>&nbsp;20%</span>
                   
                    
               </div>  
                <div class="col-lg-12">
                <div class="col-lg-3">
                   <label for="">Práctica 1:</label>
                   <input type="number" class="form-control" id="edit_practica1" disabled style="border-radius: 5px"><br>
  
               </div>
                <div class="col-lg-3">
                   <label for="">Práctica 2:</label>
                   <input type="number" class="form-control" id="edit_practica2"  disabled style="border-radius: 5px"><br>
                   
               </div>
                   <div class="col-lg-3">
                   <label for="">Práctica 3:</label>
                   <input type="number" class="form-control" id="edit_practica3" style="border-radius: 5px"><br>
  
               </div>
                <div class="col-lg-3">
                   <label for="">Práctica 4:</label>
                   <input type="number" class="form-control" id="edit_practica4" style="border-radius: 5px"><br>
                   
               </div>
                </div>

                <div class="col-lg-12">
                   <label for="">Trabajos</label>&nbsp;<span class='label label-success'>&nbsp;20%</span>
                 
                    
               </div>
                 <div class="col-lg-12">
               <div class="col-lg-3">
                   <label for="">Trabajo 1:</label>
                   <input type="number" class="form-control" id="edit_trabajo1"  disabled style="border-radius: 5px"><br>
                    
               </div>
                <div class="col-lg-3">
                   <label for="">Trabajo 2:</label>
                   <input type="number" class="form-control" id="edit_trabajo2"  disabled style="border-radius: 5px"><br>
                   
               </div>

                <div class="col-lg-3">
                   <label for="">Trabajo 3:</label>
                   <input type="number" class="form-control" id="edit_trabajo3" style="border-radius: 5px" ><br>
                    
               </div>
                <div class="col-lg-3">
                   <label for="">Trabajo 4:</label>
                   <input type="number" class="form-control" id="edit_trabajo4" style="border-radius: 5px" ><br>
                   
               </div>
               </div>

            

               <div class="col-lg-12">
                   <label for="">Parciales</label>&nbsp;<span class='label label-success'>&nbsp;20%</span>
               </div>
              <div class="col-lg-12">
               <div class="col-lg-3">
                   <label for="">Parcial 1:</label>
                   <input type="number" class="form-control" id="edit_parcial1"  disabled style="border-radius: 5px"><br>
                    
               </div>
                <div class="col-lg-3">
                   <label for="">Parcial 2:</label>
                   <input type="number" class="form-control" id="edit_parcial2"  disabled style="border-radius: 5px"><br>
                   
               </div>

               <div class="col-lg-3">
                   <label for="">Parcial 3:</label>
                   <input type="number" class="form-control" id="edit_parcial3" style="border-radius: 5px"><br>
                    
               </div>
                <div class="col-lg-3">
                   <label for="">Parcial 4:</label>
                   <input type="number" class="form-control" id="edit_parcial4" style="border-radius: 5px"><br>
                   
               </div>
               </div>

              
               <div class="col-lg-6">
                    <label for="">Exsamen</label><span class='label label-success'>&nbsp;MC-20%</span>
                    <input type="number" class="form-control" id=edit_exsamen1 style="border-radius: 5px"><br>
                </div>
                <div class="col-lg-6">
                    <label for="">Exsamen</label><span class='label label-success'>&nbsp;EF-20%</span>
                    <input type="number" class="form-control" id="edit_exsamen2" style="border-radius: 5px"><br>
                </div>
            

          </div>
        <!-- Modal footer -->
        <div class="modal-footer">
                <button class="btn btn-primary" onclick="Actualizar_notas()" ><i class="fa fa-check"><b>&nbsp;Actualizar</b></i></button>
                <button type="button" class="btn btn-danger" data-dismiss="modal"><i class="fa fa-close"><b>&nbsp;Cerrar</b></i></button>
            </div>
        
      </div>
    </div>
  </div>
</div>
</form>

<form autocomplete="false" onsubmit="return false">
  <div class="modal fade" id="ver_notas_modal" style="border-radius: 5px">
    <div class="modal-dialog">
      <div class="modal-content">
      
        <!-- Modal Header -->
        <div class="modal-header">
        <h4 class="modal-title"><b><i class='fa fa-edit'></i>&nbsp;NOTAS REGISTRAOS</b></h4>
         
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        
        <!-- Modal body -->
        <div class="modal-body">
            <div class="col-lg-12">
                       <div class=" table-responsive" ><br>
                             <table id="tabla_notas "style="width: 100%" class="table table-bordered table-sm">
                                  <thead class=" thead-drak" bgcolor="black" style="color: #ffffff">
                                           <td>p1</td>
                                           <td>p2</td> 
                                           <td>p3</td>   
                                           <td>p4</td>
                                           <td>T1</td>
                                           <td>T2</td> 
                                           <td>T3</td>   
                                           <td>T4</td>
                                           <td>P1</td>
                                           <td>P2</td> 
                                           <td>P3</td>   
                                           <td>P4</td>
                                           <td>E1</td>   
                                           <td>E2</td>
                                           <td>Quitar</td> 
                                        </tr>
                                   <tbody id="tabla_notas">   
                                  </tbody>
                            </table>
                        
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



<script>
    var cont=0;
$(document).ready(function() {
listar_gradosdocente();
    $("#modal_registro_docente").on('shown.bs.modal',function(){
        $("#txt_usu").focus();  
    })

   


    ////////////////

   

} );
</script>