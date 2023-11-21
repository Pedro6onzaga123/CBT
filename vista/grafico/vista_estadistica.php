
<script type="text/javascript" src="../js/grafico.js?rev=<?php echo time();?>"></script>
         <!-- Highcharts JS --> 
   <script src="../Plantilla/graficos/pluggins/Highcharts_7.0.3/code/highcharts.js"></script>
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<div class="col-md-12">
          <div class="box box-warning box-solid">
          
            <div class="box-header with-border">
              <h3 class="box-title">BIENVENIDO ESTADISTICA</h3>

              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
              </div>
              <!-- /.box-tools -->
            </div>
            <!-- /.box-header -->
            <div class="box-body">
       <div class="row">
        <div class="col-md-6">
          <div class="box box-info">
            <div class="box-header with-border">
              <h3 class="box-title">GRADOS</h3>
            </div>
              <div class="box-body">

                <div class="text-center">
              <div class="btn-group" role="group" aria-label="">
                       
            <button id="btnTortaprimaria" type="button" class="btn btn-primary">Primaria</button>
            <button id="secundariabtnTorta" type="button" class="btn btn-warning">Secundaria</button>
                       
            <button id="btnBD" type="button" class="btn btn-info">Grados desde BD</button>
        </div>
         </div>

       <div id="grados" style="min-width: 320px; height: 400px; margin: 0 auto"></div>    
              </div>
              <!-- /.box-body -->
              <div class="box-footer">
                <button type="submit" class="btn btn-default">Cancel</button>
                <button type="submit" class="btn btn-info pull-right">Sign in</button>
              </div>
          </div>
        </div>



        <div class="col-md-6">
          <div class="box box-info">
            <div class="box-header with-border">
              <h3 class="box-title">PAGOS</h3>
            </div>
              <div class="box-body">
                
                <div class="text-center">
              <div class="btn-group" role="group" aria-label="">
            <button id="btnColumnas" type="button" class="btn btn-secondary">Columnas</button>
            <button id="btnLineas" type="button" class="btn btn-primary">Líneas</button>            
            
        </div>
         </div>

       <div id="pagos" style="min-width: 320px; height: 400px; margin: 0 auto"></div>


              </div>
              <!-- /.box-body -->
              <div class="box-footer">
                <button type="submit" class="btn btn-default">Cancel</button>
                <button type="submit" class="btn btn-info pull-right">Sign in</button>
              </div>
          </div>
        </div>
      </div>
            </div>
            </div>

          </div>
      


      <!--Modal para gráficos--> 
      <form autocomplete="false" onsubmit="return false">   
        <div id="modal-1" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-sm">
        <div class="modal-content">
             <div class="modal-header">
                    <h5 class="modal-title"></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                    </button>
                </div>        
                <div class="modal-body"> 
                    <!--En este container se muestran los gráficos-->
                    <div id="contenedor-modal" style="min-width: 320px; height: 400px; margin: 0 auto"></div>
                </div>                    
        </div>
        </div>
        </div>
      </form>