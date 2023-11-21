
<?php
session_start();
?>
<script type="text/javascript" src="../js/alumno.js?rev=<?php echo time();?>"></script>
<div class="col-md-4">
          <div class="box box-warning">
           
            <div class="box-header with-border">
              <h3 class="box-title"><b>CURSOS Y CALIFICACIONES</b></h3>

              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
              </div>
              <!-- /.box-tools -->
            </div>
            <!-- /.box-header -->
            <div class="box-body">
              <input type="text" id="AlumIDgrado" value="<?php echo $_SESSION['S_GRADO'] ?> " hidden>
              <!--<h5><b>GRADO ACTUAL <label id="nombreGrado"></label></b></h5>-->
             
              <table id="table_cursos" class="display responsive nowrap" style="width:100%">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Nombre</th>
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
                        
                    </tr>
                </tfoot>
            </table>




            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->
        </div>

<div class="col-md-8" id="divtablanotas" hidden>
          <div class="box box-warning">
            <div class="box-header with-border">
              <h3 class="box-title"><b>NOTAS DE CURSO <label id="Cursonom"></label></b></h3>

              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
              </div>
              <!-- /.box-tools -->
            </div>
            <!-- /.box-header -->
            <div class="box-body">

          <div class=" table-responsive" ><br>
        <table id="tabla_notas "style="width: 100%" class="table table-bordered table-sm">
                                     <thead class=" thead-drak" bgcolor="black" style="color: black;">
                                           <td style="background-color:#20c997;">p1</td>
                                           <td style="background-color:#20c997;">p2</td> 
                                           <td style="background-color:#20c997;">p3</td>   
                                           <td style="background-color:#20c997;">p4</td>
                                           <td style="background-color:#17a2b8;">T1</td>
                                           <td style="background-color:#17a2b8;">T2</td> 
                                           <td style="background-color:#17a2b8;">T3</td>   
                                           <td style="background-color:#17a2b8;">T4</td>
                                           <td style="background-color:#fd7e14;">P1</td>
                                           <td style="background-color:#fd7e14;">P2</td> 
                                           <td style="background-color:#fd7e14;">P3</td>   
                                           <td style="background-color:#fd7e14;">P4</td>
                                           <td style="background-color:#e83e8c;">E1</td>   
                                           <td style="background-color:#e83e8c;">E2</td> 
                                        </tr>
                                      </thead>
                                       <tfoot id="tfoot">
                                          <tr>
                                          <td style="background-color:#20c997;">Prac</td>
                                          <td><span class='label label-success'>20% </span></td> 
                                          <td colspan=2 id="totalparcticas"></td>

                                          <td style="background-color:#17a2b8;">Trab</td>
                                          <td><span class='label label-success'>20% </span></td> 
                                          <td colspan=2 id="totaltrabajo"></td>

                                          <td style="background-color:#fd7e14;">Parc</td>
                                          <td><span class='label label-success'>20% </span></td> 
                                          <td colspan=2 id="totalparciales"></td>

                                          
                                          <!--<td><span class='label label-success'>20% </span></td>--> 
                                          <td colspan=1 id="examen1"></td>
                                          <!--<td><span class='label label-success'>20% </span></td>--> 
                                          <td colspan=1 id="2examen"></td>
                                        </tr>
                                          <br>
                                         <tr>
                                          <td colspan="12">Ponderado final:</td>
                                          <td colspan="2" id="pondefinal"></td>
                                        
                                         </tr>
                                          </tfoot>
                                           
                                   <tbody id="tabla_notas">   
                                  </tbody>
                            </table>
                        
                        </div>

            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->
        </div>
       

 <script>
$(document).ready(function() {
    //idGrado();
    var idGrado=$("#AlumIDgrado").val();
  listar_cursosAlumno(idGrado);
 
  


} );
</script>